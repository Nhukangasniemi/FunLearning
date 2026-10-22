import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY || "mock-key";
export const openai = new OpenAI({ apiKey });

export const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5-nano";

export interface GenerateFoodStoryOptions {
  childName?: string;
  selectedFoods: string[];
  meal: "breakfast" | "lunch" | "dinner" | "dessert";
}

/**
 * Pro AI Feature: Generate an engaging, educational 3-sentence Cambridge Starters story
 */
export async function generateFoodStory({
  childName = "Lily",
  selectedFoods,
  meal,
}: GenerateFoodStoryOptions): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return `${childName} is having a wonderful ${meal}! On the colorful plate, there is delicious ${selectedFoods.join(" and ")}. "Yummy in my tummy!" shouts ${childName} with a big cheerful smile!`;
  }

  const prompt = `You are a Cambridge Young Learners English (Starters) educational assistant for an 8-year-old child.
Write a cheerful 3-sentence story about ${childName} eating ${meal}.
The meal includes: ${selectedFoods.join(", ")}.
Use simple present tense, A1 Cambridge Starters vocabulary, phonics rhythm, and lots of enthusiastic emojis.`;

  const response = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [
      { role: "system", content: "You write fun, simple A1 Cambridge Starters English stories for young children." },
      { role: "user", content: prompt },
    ],
    max_tokens: 200,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content?.trim() || "";
}

/**
 * Pro AI Feature: Generate a fun phonics riddle for food vocabulary
 */
export async function generatePhonicsRiddle(foodName: string): Promise<{ riddle: string; hint: string }> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      riddle: `I am yellow, sweet, and monkeys love to peel me! What am I?`,
      hint: `Starts with the letter B!`,
    };
  }

  const response = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [
      {
        role: "system",
        content: "You create short 2-line riddles for 8-year-old children learning English food words.",
      },
      {
        role: "user",
        content: `Create a cute 2-line riddle for the food: "${foodName}". Include a hint. Format as JSON with keys "riddle" and "hint".`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const parsed = JSON.parse(response.choices[0]?.message?.content || "{}");
  return {
    riddle: parsed.riddle || `Can you guess this yummy food?`,
    hint: parsed.hint || `Look at the picture closely!`,
  };
}

