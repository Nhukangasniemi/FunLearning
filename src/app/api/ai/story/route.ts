import { NextResponse } from "next/server";
import { generateFoodStory } from "@/lib/openai";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const isPro = (session?.user as unknown as { isPro?: boolean })?.isPro ?? true; // Allow in demo/dev mode

    const body = await req.json();
    const { childName = "Lily", selectedFoods = ["chicken", "salad"], meal = "lunch" } = body;

    const story = await generateFoodStory({
      childName,
      selectedFoods,
      meal,
    });

    return NextResponse.json({
      story,
      isPro,
      model: process.env.OPENAI_MODEL || "gpt-5-nano",
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "AI story generation failed" },
      { status: 500 }
    );
  }
}

