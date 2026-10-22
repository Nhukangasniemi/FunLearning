import { NextResponse } from "next/server";
import { generatePhonicsRiddle } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { foodName = "apple" } = body;

    const result = await generatePhonicsRiddle(foodName);

    return NextResponse.json({
      ...result,
      model: process.env.OPENAI_MODEL || "gpt-5-nano",
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "AI riddle generation failed" },
      { status: 500 }
    );
  }
}

