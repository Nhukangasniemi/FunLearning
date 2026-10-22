import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId || userId === "guest-user") {
      return NextResponse.json({ stars: 0, completedMeals: [], quizScore: 0 });
    }

    const unitProgresses = await prisma.unitProgress.findMany({
      where: { userId },
    });

    const totalStars = unitProgresses.reduce((acc, u) => acc + u.starsEarned, 0);
    const totalQuizScore = unitProgresses.reduce((acc, u) => acc + u.quizScore, 0);

    return NextResponse.json({
      stars: totalStars,
      completedMeals: [],
      quizScore: totalQuizScore,
      unitProgresses,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const body = await req.json();
    const { stars = 0, quizScore = 0, spellingScore = 0, unitSlug = "unit-4-food" } = body;

    if (!userId || userId === "guest-user") {
      return NextResponse.json({ saved: false, guest: true, data: { stars, quizScore, spellingScore } });
    }

    const unit = await prisma.unit.findFirst({
      where: { slug: unitSlug },
    });

    if (!unit) {
      return NextResponse.json({ error: `Unit ${unitSlug} not found` }, { status: 404 });
    }

    const progress = await prisma.unitProgress.upsert({
      where: {
        userId_unitId: {
          userId,
          unitId: unit.id,
        },
      },
      update: {
        starsEarned: { increment: stars },
        quizScore: quizScore || undefined,
      },
      create: {
        userId,
        unitId: unit.id,
        starsEarned: stars,
        quizScore: quizScore || 0,
      },
    });

    return NextResponse.json({ saved: true, progress });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

