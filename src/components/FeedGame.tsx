"use client";

import React, { useState } from "react";
import { FoodItemType, MealType } from "@/types";
import { soundManager } from "@/lib/audio";
import { Utensils, Sparkles, RotateCcw, Bot, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FeedGameProps {
  foodItems: FoodItemType[];
  onFeedLily: (items: FoodItemType[]) => void;
  onMealComplete: (meal: MealType) => void;
  isPro?: boolean;
  onOpenProModal?: () => void;
}

const MEALS: { type: MealType; label: string; icon: string; bookPrompt: string }[] = [
  {
    type: "breakfast",
    label: "Breakfast ☀️",
    icon: "🍳",
    bookPrompt: "Page 26 & 29: Eggs, sausages, tomatoes, beans, warm bread, and fresh fruit!",
  },
  {
    type: "lunch",
    label: "Lunch 🥪",
    icon: "🥪",
    bookPrompt: "Page 26: Sam's lunch is fish, rice, and pineapple! Or roast chicken, fresh salad, and bread!",
  },
  {
    type: "dinner",
    label: "Dinner 🌙",
    icon: "🍗",
    bookPrompt: "Page 26 & 29: Sam's favourite dinner is burgers and chips! Or sausages, meatballs, and pie!",
  },
  {
    type: "dessert",
    label: "Sweet Dessert 🍨",
    icon: "🍰",
    bookPrompt: "Unit 4 & 5: Sweet watermelon, mango, kiwi, juicy pineapple, berry pie, or ice cream!",
  },
];

interface BrowserAILanguageModelSession {
  prompt: (input: string) => Promise<string>;
  destroy: () => void;
}

interface BrowserAILanguageModel {
  capabilities?: () => Promise<{ available: string }>;
  availability?: () => Promise<string>;
  create: (options?: { systemPrompt?: string }) => Promise<BrowserAILanguageModelSession>;
}

/**
 * Generates a kid's story using Google's Built-in Browser AI (Gemini Nano via Prompt API).
 * Returns null if not supported or unavailable so callers can gracefully fallback.
 */
async function generateKidStoryWithBuiltInAI(topic: string): Promise<string | null> {
  if (typeof window === "undefined") return null;

  const win = window as unknown as {
    ai?: { languageModel?: BrowserAILanguageModel };
    LanguageModel?: BrowserAILanguageModel;
  };

  const lm = win.ai?.languageModel || win.LanguageModel;
  if (!lm) {
    return null;
  }

  // 1. Check if Built-in AI is supported and ready
  let isReady = false;
  if (typeof lm.capabilities === "function") {
    const capabilities = await lm.capabilities();
    if (capabilities.available !== "no") {
      isReady = true;
    } else {
      console.warn("Gemini Nano is not available or downloading. Check chrome://components");
      return null;
    }
  } else if (typeof lm.availability === "function") {
    const status = await lm.availability();
    if (status !== "no" && status !== "unavailable") {
      isReady = true;
    } else {
      return null;
    }
  } else {
    isReady = true;
  }

  if (!isReady) {
    return null;
  }

  // 2. Initialize the model session with system instructions
  const session = await lm.create({
    systemPrompt:
      "You are a friendly, patient teacher helping young children learn English. " +
      "Create engaging, ultra-short stories using simple vocabulary.",
  });

  // 3. Define the prompt constraint
  const prompt = `Write a simple 2 to 3 sentence story about ${topic}. Use easy English words suited for beginners.`;

  try {
    // 4. Generate the content
    const story = await session.prompt(prompt);
    console.log("Generated Story (Google Built-in AI Gemini Nano):", story);
    return story?.trim() || null;
  } catch (error) {
    console.error("Browser AI generation failed:", error);
    return null;
  } finally {
    // 5. Always destroy the session to free up device memory (RAM)
    session.destroy();
  }
}

export const FeedGame: React.FC<FeedGameProps> = ({
  foodItems,
  onFeedLily,
  onMealComplete,
  isPro = false,
  onOpenProModal,
}) => {
  const [activeMeal, setActiveMeal] = useState<MealType>("breakfast");
  const [plateItems, setPlateItems] = useState<FoodItemType[]>([]);
  const [aiStory, setAiStory] = useState<string | null>(null);
  const [isBuiltInAI, setIsBuiltInAI] = useState(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  const availableFoods = foodItems.filter((item) =>
    item.suitableMeals.includes(activeMeal)
  );

  const currentMealInfo = MEALS.find((m) => m.type === activeMeal)!;

  const handleTogglePlate = (food: FoodItemType) => {
    soundManager.playPop();
    soundManager.speak(food.name);

    if (plateItems.some((item) => item.id === food.id)) {
      setPlateItems((prev) => prev.filter((item) => item.id !== food.id));
    } else {
      if (plateItems.length >= 4) {
        soundManager.speak("The plate is full! Let's feed Lily!");
        return;
      }
      setPlateItems((prev) => [...prev, food]);
    }
  };

  const handleFeed = () => {
    if (plateItems.length === 0) {
      soundManager.speak("Please put some delicious food on the plate first!");
      return;
    }

    onFeedLily(plateItems);
    onMealComplete(activeMeal);
    setPlateItems([]);
    setAiStory(null);
  };

  const handleGenerateStory = async () => {
    if (plateItems.length === 0) {
      soundManager.speak("Choose some food first so the AI can write a story!");
      return;
    }

    setIsGeneratingStory(true);
    soundManager.playChime();

    const foodList = plateItems.map((f) => f.displayName).join(" and ");
    const topic = `Lily eating ${foodList} for ${activeMeal}`;

    try {
      let story: string | null = null;
      let usedBrowserAI = false;

      // 1. Try Google Chrome Built-in AI (Gemini Nano on-device)
      try {
        story = await generateKidStoryWithBuiltInAI(topic);
        if (story) {
          usedBrowserAI = true;
        }
      } catch (browserErr) {
        console.warn("Browser AI attempt error, falling back to server:", browserErr);
      }

      // 2. Graceful fallback to server API if browser AI is unsupported or unavailable
      if (!story) {
        const res = await fetch("/api/ai/story", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            childName: "Lily",
            meal: activeMeal,
            selectedFoods: plateItems.map((f) => f.displayName),
          }),
        });

        const data = await res.json();
        story = data.story;
      }

      if (story) {
        setAiStory(story);
        setIsBuiltInAI(usedBrowserAI);
        soundManager.speak(story);
      }
    } catch {
      setAiStory(
        `Lily loves eating delicious ${foodList} for ${activeMeal}! "Yummy in my tummy!" she smiles cheerfully.`
      );
    } finally {
      setIsGeneratingStory(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Meal Selection Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/90 border border-slate-200 rounded-2xl shadow-xs">
        {MEALS.map((meal) => (
          <Button
            key={meal.type}
            variant={activeMeal === meal.type ? "pro" : "ghost"}
            size="sm"
            onClick={() => {
              setActiveMeal(meal.type);
              soundManager.playPop();
              setPlateItems([]);
              setAiStory(null);
            }}
            className="flex-1 min-w-30"
          >
            <span>{meal.label}</span>
          </Button>
        ))}
      </div>

      {/* Book Context Banner */}
      <Card className="bg-sky-50/80 border-sky-200/80 p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentMealInfo.icon}</span>
          <div>
            <Badge variant="blue" className="mb-1 text-[10px]">
              Cambridge Starters Food Quest
            </Badge>
            <p className="text-sm font-semibold text-slate-800">
              {currentMealInfo.bookPrompt}
            </p>
          </div>
        </div>
      </Card>

      {/* Main Dining Plate Card */}
      <Card className="p-6 relative overflow-hidden flex flex-col items-center bg-white border-slate-200/90 shadow-md">
        <div className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
          <Utensils className="w-4 h-4 text-amber-500" />
          <span>Lily&apos;s Dining Plate (Tap foods below to add)</span>
        </div>

        {/* Large Decorative Plate */}
        <div className="w-64 h-64 md:w-72 md:h-72 rounded-full border-8 border-slate-200 bg-slate-50/80 shadow-inner flex flex-wrap items-center justify-center p-6 gap-3 relative transition-all duration-300">
          {plateItems.length === 0 ? (
            <div className="text-center text-slate-400 select-none">
              <span className="text-4xl block mb-1">🍽️</span>
              <p className="text-xs font-semibold text-slate-500">Plate is empty</p>
              <p className="text-[11px] text-slate-400">Tap food cards below</p>
            </div>
          ) : (
            plateItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleTogglePlate(item)}
                className="w-20 h-20 bg-white border-2 border-amber-300 rounded-2xl p-2 cursor-pointer hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center relative group shadow-sm"
                title="Tap to remove"
              >
                <div
                  className="w-12 h-12"
                  dangerouslySetInnerHTML={{ __html: item.svg || "" }}
                />
                <span className="text-[10px] font-bold text-slate-800 mt-1 truncate max-w-full">
                  {item.displayName}
                </span>
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full w-4 h-4 text-[9px] font-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  ×
                </span>
              </div>
            ))
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap gap-3 mt-6 w-full max-w-md justify-center">
          <Button
            variant="candy"
            size="lg"
            onClick={handleFeed}
            disabled={plateItems.length === 0}
            className="flex-1 font-black shadow-md"
          >
            <span>Feed Lily! 😋</span>
          </Button>

          {/* AI Storyteller (Google Chrome Built-in AI / Server fallback) */}
          <Button
            variant="pro"
            size="lg"
            onClick={handleGenerateStory}
            disabled={isGeneratingStory}
            title="AI generates a custom story using Google Chrome Built-in AI or Cloud"
            className="shadow-md"
          >
            <Bot className="w-4 h-4 text-amber-300" />
            <span>{isGeneratingStory ? "AI Writing..." : "AI Story ✨"}</span>
          </Button>

          {plateItems.length > 0 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setPlateItems([]);
                soundManager.playPop();
              }}
              title="Clear plate"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* AI Story Output Box */}
        {aiStory && (
          <Card className="mt-5 w-full max-w-lg bg-purple-50/90 border-purple-200 p-4 animate-fade-in shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant={isBuiltInAI ? "emerald" : "default"}
                className="text-xs font-bold flex items-center gap-1.5"
              >
                {isBuiltInAI ? (
                  <>
                    <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Gemini Nano (On-Device Browser AI ⚡)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Starters Story</span>
                  </>
                )}
              </Badge>
              <Button
                variant="link"
                size="sm"
                onClick={() => soundManager.speak(aiStory)}
                className="text-[11px] text-purple-700 p-0 h-auto font-bold"
              >
                🔊 Listen Again
              </Button>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-semibold">
              {aiStory}
            </p>
          </Card>
        )}
      </Card>

      {/* Available Foods Grid */}
      <div>
        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <span>Choose Foods for {currentMealInfo.label}</span>
          <Badge variant="secondary" className="font-normal text-[11px]">
            {availableFoods.length} options
          </Badge>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {availableFoods.map((food) => {
            const isSelected = plateItems.some((item) => item.id === food.id);
            return (
              <Card
                key={food.id}
                onClick={() => handleTogglePlate(food)}
                className={`p-3 cursor-pointer transition-all duration-200 flex flex-col items-center select-none bg-white shadow-xs ${
                  isSelected
                    ? "border-purple-500 bg-purple-50/90 ring-2 ring-purple-300 shadow-md scale-[1.03]"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/80"
                }`}
              >
                <div
                  className="w-16 h-16 mb-2 pointer-events-none"
                  dangerouslySetInnerHTML={{ __html: food.svg || "" }}
                />
                <span className="text-sm font-bold text-slate-900">
                  {food.displayName}
                </span>
                <span className="text-[11px] font-bold text-rose-500 tracking-wide">
                  {food.phonics}
                </span>
                {food.isFromBook && (
                  <Badge variant="blue" className="mt-1 text-[9px] py-0 px-2 font-bold">
                    {food.source.includes("Page")
                      ? food.source.split("(")[0].trim().replace(/^Book\s*/, "")
                      : "Unit 4"}
                  </Badge>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
