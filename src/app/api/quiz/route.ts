import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { BOOK_QUIZ_QUESTIONS } from "@/data/quizQuestions";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const unitSlug = searchParams.get("unitSlug") || "unit-4-food";

    const dbQuestions = await prisma.quizQuestion.findMany({
      where: {
        unit: { slug: unitSlug },
      },
      orderBy: { sortOrder: "asc" },
      include: {
        options: {
          orderBy: { text: "asc" },
        },
      },
    });

    if (dbQuestions && dbQuestions.length > 0) {
      const questions = dbQuestions.map((q) => {
        // Extract multiChoice combo fruits if present
        const comboOption = q.options.find((o) => o.combo && (o.combo as string[]).length > 0);
        return {
          id: q.id,
          unitId: q.unitId,
          bookPage: q.bookPage,
          part: q.part,
          question: q.question,
          instruction: q.instruction,
          audioTranscript: q.audioTranscript,
          correctOption: q.correctOption,
          multiChoice: q.multiChoice,
          fruitsInBag: (comboOption?.combo as string[]) || undefined,
          explanation: q.explanation,
          sortOrder: q.sortOrder,
          options: q.options.map((o) => ({
            id: o.id,
            questionId: o.questionId,
            text: o.text,
            isCorrect: o.isCorrect,
            imageLabel: o.imageLabel,
            combo: o.combo as string[] | undefined,
            vocabularyItemId: o.vocabularyItemId,
          })),
        };
      });
      return NextResponse.json({ questions });
    }
  } catch (err) {
    console.warn("Neon DB query fallback for quiz questions:", err);
  }

  return NextResponse.json({ questions: BOOK_QUIZ_QUESTIONS });
}

