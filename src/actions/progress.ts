"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";
import { VocabularyItemType, WordProgressType } from "@/types";
import { ALL_VOCABULARY_ITEMS } from "@/data/curriculum";

interface ActionResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const saveUnitProgressSchema = z.object({
  unitId: z.string(),
  starsDelta: z.number().int().min(0).default(0),
  learnCompleted: z.boolean().optional(),
  flashcardsCompleted: z.boolean().optional(),
  gamesCompleted: z.boolean().optional(),
  quizScore: z.number().int().optional(),
});

/**
 * Save unit progress and award stars
 */
export async function saveUnitProgressAction(
  rawInput: z.infer<typeof saveUnitProgressSchema>
): Promise<ActionResponse<{ starsTotal: number }>> {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const validated = saveUnitProgressSchema.parse(rawInput);

    if (!userId) {
      // Guest mode - silently return success so UI can use localStorage
      return { success: true, data: { starsTotal: validated.starsDelta } };
    }

    // Upsert unit progress
    const existing = await prisma.unitProgress.findUnique({
      where: {
        userId_unitId: {
          userId,
          unitId: validated.unitId,
        },
      },
    });

    const isFullyCompleted =
      (validated.learnCompleted ?? existing?.learnCompleted ?? false) &&
      (validated.flashcardsCompleted ?? existing?.flashcardsCompleted ?? false) &&
      (validated.gamesCompleted ?? existing?.gamesCompleted ?? false);

    const updatedUnitProgress = await prisma.unitProgress.upsert({
      where: {
        userId_unitId: {
          userId,
          unitId: validated.unitId,
        },
      },
      create: {
        userId,
        unitId: validated.unitId,
        starsEarned: validated.starsDelta,
        learnCompleted: validated.learnCompleted ?? false,
        flashcardsCompleted: validated.flashcardsCompleted ?? false,
        gamesCompleted: validated.gamesCompleted ?? false,
        quizScore: validated.quizScore ?? 0,
        isCompleted: isFullyCompleted,
        completedAt: isFullyCompleted ? new Date() : null,
      },
      update: {
        starsEarned: { increment: validated.starsDelta },
        ...(validated.learnCompleted !== undefined && { learnCompleted: validated.learnCompleted }),
        ...(validated.flashcardsCompleted !== undefined && { flashcardsCompleted: validated.flashcardsCompleted }),
        ...(validated.gamesCompleted !== undefined && { gamesCompleted: validated.gamesCompleted }),
        ...(validated.quizScore !== undefined && { quizScore: validated.quizScore }),
        isCompleted: isFullyCompleted,
        completedAt: isFullyCompleted ? new Date() : undefined,
      },
    });

    // Calculate total stars across all units for this user
    const totalStarsAggregate = await prisma.unitProgress.aggregate({
      where: { userId },
      _sum: { starsEarned: true },
    });

    const starsTotal = totalStarsAggregate._sum.starsEarned || 0;

    return {
      success: true,
      data: { starsTotal },
    };
  } catch (err) {
    console.warn("Could not save unit progress to Neon DB:", err);
    return { success: true, data: { starsTotal: 0 } };
  }
}

const updateWordMasterySchema = z.object({
  vocabularyItemId: z.string(),
  isCorrect: z.boolean(),
});

/**
 * Update word spaced-repetition mastery level:
 * isCorrect = true -> increment mastery (0 -> 1 -> 2)
 * isCorrect = false -> reset or decrement mastery, increment mistakeCount
 */
export async function updateWordMasteryAction(
  rawInput: z.infer<typeof updateWordMasterySchema>
): Promise<ActionResponse<{ masteryLevel: number }>> {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const validated = updateWordMasterySchema.parse(rawInput);

    if (!userId) {
      return { success: true, data: { masteryLevel: validated.isCorrect ? 2 : 1 } };
    }

    const existing = await prisma.wordProgress.findUnique({
      where: {
        userId_vocabularyItemId: {
          userId,
          vocabularyItemId: validated.vocabularyItemId,
        },
      },
    });

    let newMastery = existing ? existing.masteryLevel : 0;
    if (validated.isCorrect) {
      newMastery = Math.min(2, newMastery + 1);
    } else {
      newMastery = Math.max(1, newMastery - 1);
    }

    const updated = await prisma.wordProgress.upsert({
      where: {
        userId_vocabularyItemId: {
          userId,
          vocabularyItemId: validated.vocabularyItemId,
        },
      },
      create: {
        userId,
        vocabularyItemId: validated.vocabularyItemId,
        masteryLevel: validated.isCorrect ? 2 : 1,
        reviewCount: 1,
        mistakeCount: validated.isCorrect ? 0 : 1,
        lastReviewedAt: new Date(),
      },
      update: {
        masteryLevel: newMastery,
        reviewCount: { increment: 1 },
        mistakeCount: validated.isCorrect ? undefined : { increment: 1 },
        lastReviewedAt: new Date(),
      },
    });

    return { success: true, data: { masteryLevel: updated.masteryLevel } };
  } catch (err) {
    console.warn("Could not update word mastery to Neon DB:", err);
    return { success: true, data: { masteryLevel: rawInput.isCorrect ? 2 : 1 } };
  }
}

/**
 * Daily Smart Review:
 * Fetches all words across units that need practice (masteryLevel < 2 or mistakeCount > 0).
 */
export async function getSmartReviewWordsAction(): Promise<
  ActionResponse<{ words: VocabularyItemType[]; progressMap: Record<string, WordProgressType> }>
> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (userId) {
      const dbWordProgress = await prisma.wordProgress.findMany({
        where: {
          userId,
          OR: [{ masteryLevel: { lt: 2 } }, { mistakeCount: { gt: 0 } }],
        },
        include: {
          vocabularyItem: true,
        },
        orderBy: { lastReviewedAt: "asc" },
        take: 20,
      });

      if (dbWordProgress && dbWordProgress.length > 0) {
        const words: VocabularyItemType[] = dbWordProgress.map((wp) => ({
          id: wp.vocabularyItem.id,
          unitId: wp.vocabularyItem.unitId,
          word: wp.vocabularyItem.word,
          displayName: wp.vocabularyItem.displayName,
          phonics: wp.vocabularyItem.phonics,
          partOfSpeech: wp.vocabularyItem.partOfSpeech,
          category: wp.vocabularyItem.category,
          exampleSentence: wp.vocabularyItem.exampleSentence,
          definition: wp.vocabularyItem.definition,
          svg: wp.vocabularyItem.svg,
          imageUrl: wp.vocabularyItem.imageUrl,
          audioUrl: wp.vocabularyItem.audioUrl,
          isFromBook: wp.vocabularyItem.isFromBook,
          bookSource: wp.vocabularyItem.bookSource,
          sortOrder: wp.vocabularyItem.sortOrder,
          gameMetadata: wp.vocabularyItem.gameMetadata as Record<string, unknown> | null,
          userId: wp.vocabularyItem.userId,
        }));

        const progressMap = dbWordProgress.reduce((acc, wp) => {
          acc[wp.vocabularyItemId] = {
            id: wp.id,
            userId: wp.userId,
            vocabularyItemId: wp.vocabularyItemId,
            masteryLevel: wp.masteryLevel,
            reviewCount: wp.reviewCount,
            mistakeCount: wp.mistakeCount,
            lastReviewedAt: wp.lastReviewedAt,
          };
          return acc;
        }, {} as Record<string, WordProgressType>);

        return { success: true, data: { words, progressMap } };
      }
    }
  } catch (err) {
    console.warn("Neon DB query fallback for smart review:", err);
  }

  // Fallback: Pick a sample set of mixed words across units for smart review demo
  const allWords = Object.values(ALL_VOCABULARY_ITEMS).flat();
  const sampleWords = allWords.slice(0, 8);

  return {
    success: true,
    data: {
      words: sampleWords,
      progressMap: {},
    },
  };
}
