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

    const progress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    return NextResponse.json(progress || { stars: 0, completedMeals: [], quizScore: 0 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const body = await req.json();
    const { stars = 0, completedMeals = [], quizScore = 0, spellingScore = 0 } = body;

    if (!userId || userId === "guest-user") {
      return NextResponse.json({ saved: false, guest: true, data: { stars, completedMeals, quizScore, spellingScore } });
    }

    const progress = await prisma.userProgress.upsert({
      where: { userId },
      update: {
        stars,
        completedMeals,
        quizScore,
        spellingScore,
      },
      create: {
        userId,
        stars,
        completedMeals,
        quizScore,
        spellingScore,
      },
    });

    return NextResponse.json({ saved: true, progress });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

