import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { FOOD_ITEMS } from "@/data/foodItems";
import { auth } from "@/auth";

const createFoodSchema = z.object({
  id: z.string().min(2),
  name: z.string().min(2),
  displayName: z.string().min(2),
  phonics: z.string().min(2),
  category: z.string(),
  suitableMeals: z.array(z.string()),
  source: z.string().default("Custom Lesson"),
  isFromBook: z.boolean().default(false),
  sentence: z.string().min(5),
  svg: z.string().optional(),
  imageUrl: z.string().optional(),
});

export async function GET() {
  try {
    const dbItems = await prisma.foodItem.findMany({
      orderBy: { createdAt: "asc" },
    });

    if (dbItems && dbItems.length > 0) {
      return NextResponse.json({ items: dbItems });
    }
  } catch (err) {
    console.warn("Neon DB query fallback to local Starters dataset:", err);
  }

  // Fallback to initial Cambridge Starters dataset
  return NextResponse.json({ items: FOOD_ITEMS });
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();
    const validated = createFoodSchema.parse(body);

    const newItem = await prisma.foodItem.create({
      data: {
        id: validated.id,
        name: validated.name.toLowerCase(),
        displayName: validated.displayName,
        phonics: validated.phonics,
        category: validated.category,
        suitableMeals: validated.suitableMeals,
        source: validated.source,
        isFromBook: validated.isFromBook,
        sentence: validated.sentence,
        svg: validated.svg,
        imageUrl: validated.imageUrl,
        userId: session?.user?.id || null,
      },
    });

    return NextResponse.json({ item: newItem }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: (error as Error).message || "Failed to create food item" },
      { status: 500 }
    );
  }
}

