"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { FullUnitPayload, BookType, UnitType, VocabularyItemType, WordProgressType } from "@/types";
import {
  BOOKS,
  getUnitsForBook,
  getFullUnitPayload as getStaticUnitPayload,
} from "@/data/curriculum";

interface ActionResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Fetch all available books for the curriculum roadmap.
 */
export async function getBooksAction(): Promise<ActionResponse<BookType[]>> {
  try {
    const dbBooks = await prisma.book.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      include: {
        units: {
          where: { isPublished: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (dbBooks && dbBooks.length > 0) {
      const mappedBooks: BookType[] = dbBooks.map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        series: b.series,
        level: b.level,
        targetAge: b.targetAge,
        description: b.description,
        coverImage: b.coverImage,
        themeColor: b.themeColor,
        sortOrder: b.sortOrder,
        isPublished: b.isPublished,
        units: b.units.map((u) => ({
          id: u.id,
          bookId: u.bookId,
          unitNumber: u.unitNumber,
          slug: u.slug,
          title: u.title,
          description: u.description,
          icon: u.icon,
          themeColor: u.themeColor,
          companion: u.companion,
          sortOrder: u.sortOrder,
          isPublished: u.isPublished,
        })),
      }));

      return { success: true, data: mappedBooks };
    }
  } catch (err) {
    console.warn("Neon DB query fallback to static BOOKS data:", err);
  }

  // Fallback to static dataset
  return { success: true, data: BOOKS };
}

/**
 * Fetch all units for a given book slug.
 */
export async function getBookUnitsAction(
  bookSlug: string
): Promise<ActionResponse<{ book: BookType; units: UnitType[] }>> {
  try {
    const dbBook = await prisma.book.findUnique({
      where: { slug: bookSlug },
      include: {
        units: {
          where: { isPublished: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (dbBook) {
      const bookData: BookType = {
        id: dbBook.id,
        slug: dbBook.slug,
        title: dbBook.title,
        series: dbBook.series,
        level: dbBook.level,
        targetAge: dbBook.targetAge,
        description: dbBook.description,
        coverImage: dbBook.coverImage,
        themeColor: dbBook.themeColor,
        sortOrder: dbBook.sortOrder,
        isPublished: dbBook.isPublished,
      };

      const unitsData: UnitType[] = dbBook.units.map((u) => ({
        id: u.id,
        bookId: u.bookId,
        unitNumber: u.unitNumber,
        slug: u.slug,
        title: u.title,
        description: u.description,
        icon: u.icon,
        themeColor: u.themeColor,
        companion: u.companion,
        sortOrder: u.sortOrder,
        isPublished: u.isPublished,
      }));

      return { success: true, data: { book: bookData, units: unitsData } };
    }
  } catch (err) {
    console.warn("Neon DB query fallback for book units:", err);
  }

  // Fallback
  const staticBook = BOOKS.find((b) => b.slug.toLowerCase() === bookSlug.toLowerCase());
  if (!staticBook) {
    return { success: false, error: `Book '${bookSlug}' not found` };
  }

  const staticUnits = getUnitsForBook(bookSlug);
  return { success: true, data: { book: staticBook, units: staticUnits } };
}

/**
 * Single-roundtrip unit payload fetch:
 * Returns the book, unit, full vocabulary items, quiz questions, and current user progress.
 */
export async function getUnitPayloadAction(
  bookSlug: string,
  unitSlug: string
): Promise<ActionResponse<FullUnitPayload>> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const dbUnit = await prisma.unit.findFirst({
      where: {
        slug: unitSlug,
        book: { slug: bookSlug },
      },
      include: {
        book: true,
        vocabularyItems: {
          orderBy: { sortOrder: "asc" },
        },
        quizQuestions: {
          orderBy: { sortOrder: "asc" },
          include: {
            options: true,
          },
        },
        unitProgress: userId
          ? {
              where: { userId },
            }
          : false,
      },
    });

    if (dbUnit) {
      // Also fetch word progress if user is logged in
      let wordProgressMap: Record<string, WordProgressType> = {};
      if (userId && dbUnit.vocabularyItems.length > 0) {
        const itemIds = dbUnit.vocabularyItems.map((v) => v.id);
        const wpRows = await prisma.wordProgress.findMany({
          where: {
            userId,
            vocabularyItemId: { in: itemIds },
          },
        });

        wordProgressMap = wpRows.reduce((acc, row) => {
          acc[row.vocabularyItemId] = {
            id: row.id,
            userId: row.userId,
            vocabularyItemId: row.vocabularyItemId,
            masteryLevel: row.masteryLevel,
            reviewCount: row.reviewCount,
            mistakeCount: row.mistakeCount,
            lastReviewedAt: row.lastReviewedAt,
          };
          return acc;
        }, {} as Record<string, WordProgressType>);
      }

      const book: BookType = {
        id: dbUnit.book.id,
        slug: dbUnit.book.slug,
        title: dbUnit.book.title,
        series: dbUnit.book.series,
        level: dbUnit.book.level,
        targetAge: dbUnit.book.targetAge,
        description: dbUnit.book.description,
        coverImage: dbUnit.book.coverImage,
        themeColor: dbUnit.book.themeColor,
        sortOrder: dbUnit.book.sortOrder,
        isPublished: dbUnit.book.isPublished,
      };

      const unit: UnitType = {
        id: dbUnit.id,
        bookId: dbUnit.bookId,
        unitNumber: dbUnit.unitNumber,
        slug: dbUnit.slug,
        title: dbUnit.title,
        description: dbUnit.description,
        icon: dbUnit.icon,
        themeColor: dbUnit.themeColor,
        companion: dbUnit.companion,
        sortOrder: dbUnit.sortOrder,
        isPublished: dbUnit.isPublished,
      };

      const vocabulary: VocabularyItemType[] = dbUnit.vocabularyItems.map((v) => ({
        id: v.id,
        unitId: v.unitId,
        word: v.word,
        displayName: v.displayName,
        phonics: v.phonics,
        partOfSpeech: v.partOfSpeech,
        category: v.category,
        exampleSentence: v.exampleSentence,
        definition: v.definition,
        svg: v.svg,
        imageUrl: v.imageUrl,
        audioUrl: v.audioUrl,
        isFromBook: v.isFromBook,
        bookSource: v.bookSource,
        sortOrder: v.sortOrder,
        gameMetadata: v.gameMetadata as Record<string, unknown> | null,
        userId: v.userId,
      }));

      const quizQuestions = dbUnit.quizQuestions.map((q) => ({
        id: q.id,
        unitId: q.unitId,
        bookPage: q.bookPage,
        part: q.part,
        question: q.question,
        instruction: q.instruction,
        audioTranscript: q.audioTranscript,
        correctOption: q.correctOption,
        multiChoice: q.multiChoice,
        explanation: q.explanation,
        sortOrder: q.sortOrder,
        options: q.options.map((o) => ({
          id: o.id,
          questionId: o.questionId,
          text: o.text,
          isCorrect: o.isCorrect,
          imageLabel: o.imageLabel,
          combo: o.combo,
          vocabularyItemId: o.vocabularyItemId,
        })),
      }));

      const userProgress = dbUnit.unitProgress?.[0]
        ? {
            id: dbUnit.unitProgress[0].id,
            userId: dbUnit.unitProgress[0].userId,
            unitId: dbUnit.unitProgress[0].unitId,
            starsEarned: dbUnit.unitProgress[0].starsEarned,
            isCompleted: dbUnit.unitProgress[0].isCompleted,
            learnCompleted: dbUnit.unitProgress[0].learnCompleted,
            flashcardsCompleted: dbUnit.unitProgress[0].flashcardsCompleted,
            gamesCompleted: dbUnit.unitProgress[0].gamesCompleted,
            quizScore: dbUnit.unitProgress[0].quizScore,
            completedAt: dbUnit.unitProgress[0].completedAt,
          }
        : null;

      return {
        success: true,
        data: {
          book,
          unit,
          vocabulary,
          quizQuestions,
          userProgress,
          wordProgress: wordProgressMap,
        },
      };
    }
  } catch (err) {
    console.warn("Neon DB unit query fallback to static dataset:", err);
  }

  // Fallback to static dataset
  const staticPayload = getStaticUnitPayload(bookSlug, unitSlug);
  if (!staticPayload) {
    return { success: false, error: `Unit '${unitSlug}' in '${bookSlug}' not found` };
  }

  return { success: true, data: staticPayload };
}
