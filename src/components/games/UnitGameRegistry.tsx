"use client";

import React from "react";
import { VocabularyItemType, FoodItemType, MealType } from "@/types";
import { FeedGame } from "@/components/FeedGame";
import { MemoryMatchEngine } from "@/components/games/MemoryMatchEngine";
import { SpellingEngine } from "@/components/games/SpellingEngine";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Shirt } from "lucide-react";
import { soundManager } from "@/lib/audio";

interface UnitGameRegistryProps {
  unitId: string;
  items: VocabularyItemType[];
  onFeedLily?: (items: FoodItemType[]) => void;
  onMealComplete?: (meal: MealType) => void;
  onEarnStar?: () => void;
  isPro?: boolean;
  onOpenProModal?: () => void;
}

export const UnitGameRegistry: React.FC<UnitGameRegistryProps> = ({
  unitId,
  items,
  onFeedLily,
  onMealComplete,
  onEarnStar,
  isPro = true,
  onOpenProModal,
}) => {
  // Unit 4: Food -> Thematic Feed Lily Game
  if (unitId === "starters-u4-food") {
    // Map VocabularyItemType back to FoodItemType
    const foodItems: FoodItemType[] = items.map((v) => ({
      id: v.id,
      name: v.word,
      displayName: v.displayName,
      phonics: v.phonics,
      category: v.category || "meal",
      suitableMeals: ((v.gameMetadata?.suitableMeals as MealType[]) || [
        "breakfast",
        "lunch",
        "dinner",
      ]),
      source: v.bookSource || "Book Page 29",
      isFromBook: v.isFromBook,
      sentence: v.exampleSentence,
      svg: v.svg || undefined,
      imageUrl: v.imageUrl || undefined,
      userId: v.userId,
    }));

    return (
      <FeedGame
        foodItems={foodItems}
        onFeedLily={onFeedLily || (() => {})}
        onMealComplete={onMealComplete || (() => {})}
        isPro={isPro}
        onOpenProModal={onOpenProModal}
      />
    );
  }

  // Unit 6: Clothes -> Dress Lily Game
  if (unitId === "starters-u6-clothes") {
    return (
      <Card className="max-w-xl mx-auto p-8 text-center bg-white rounded-3xl shadow-xl border-2 border-purple-200">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
          <Shirt className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-2">Dress Lily! 👗</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Help Lily pick the perfect outfit for sunny days and rainy weather! Tap to try on clothes!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playPop();
                soundManager.speak(`Lily is wearing her ${item.displayName}!`);
                onEarnStar?.();
              }}
              className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex flex-col items-center hover:bg-purple-100 active:scale-95 transition-all"
            >
              <div className="w-16 h-16 mb-2">
                {item.svg ? (
                  <div dangerouslySetInnerHTML={{ __html: item.svg }} className="w-full h-full" />
                ) : (
                  <div className="w-full h-full bg-purple-200 rounded-xl flex items-center justify-center font-bold text-xs">
                    {item.displayName}
                  </div>
                )}
              </div>
              <span className="font-bold text-xs text-slate-800">{item.displayName}</span>
            </button>
          ))}
        </div>

        <p className="text-xs text-purple-600 font-semibold">
          ✨ Tap any clothing item to dress Lily and earn a Star!
        </p>
      </Card>
    );
  }

  // Default Fallback: Memory Match Engine
  return <MemoryMatchEngine items={items} onEarnStar={onEarnStar} />;
};
