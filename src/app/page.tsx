"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { CharacterLily } from "@/components/CharacterLily";
import { FeedGame } from "@/components/FeedGame";
import { QuizGame } from "@/components/QuizGame";
import { DictionaryView } from "@/components/DictionaryView";
import { ProModal } from "@/components/ProModal";
import { FOOD_ITEMS as INITIAL_FOODS } from "@/data/foodItems";
import { FoodItemType, MealType } from "@/types";
import { soundManager } from "@/lib/audio";
import { Award, BookOpen, Utensils, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"feed" | "quiz" | "dict">("feed");
  const [dressColor, setDressColor] = useState<"pink" | "purple">("pink");
  const [stars, setStars] = useState(0);
  const [completedMeals, setCompletedMeals] = useState<MealType[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItemType[]>(INITIAL_FOODS);

  // Character interaction states
  const [lilySpeech, setLilySpeech] = useState(
    "Hi! I'm Lily! Let's choose delicious food for breakfast, lunch, and dinner!"
  );
  const [isLilyChewing, setIsLilyChewing] = useState(false);

  // Pro & modals
  const [isPro, setIsPro] = useState(true);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Fetch items & progress on mount
  useEffect(() => {
    async function loadData() {
      try {
        const itemsRes = await fetch("/api/items");
        if (itemsRes.ok) {
          const itemsData = await itemsRes.json();
          if (itemsData.items && itemsData.items.length > 0) {
            setFoodItems(itemsData.items);
          }
        }
      } catch (e) {
        console.warn("Could not fetch items from Neon DB:", e);
      }

      try {
        const progressRes = await fetch("/api/user/progress");
        if (progressRes.ok) {
          const progData = await progressRes.json();
          if (progData.stars) setStars(progData.stars);
          if (progData.completedMeals) setCompletedMeals(progData.completedMeals);
        }
      } catch (e) {
        console.warn("Could not fetch progress from Neon DB:", e);
      }
    }
    loadData();
  }, []);

  const saveProgress = async (newStars: number, newMeals: MealType[]) => {
    try {
      await fetch("/api/user/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stars: newStars,
          completedMeals: newMeals,
        }),
      });
    } catch {
      // Offline fallback
    }
  };

  const handleToggleDress = () => {
    setDressColor((prev) => (prev === "pink" ? "purple" : "pink"));
    soundManager.speak(
      `Look! I'm wearing my ${dressColor === "pink" ? "purple" : "pink"} dress now!`
    );
  };

  const handleEarnStar = () => {
    const newCount = stars + 1;
    setStars(newCount);
    saveProgress(newCount, completedMeals);
  };

  const handleFeedLily = (items: FoodItemType[]) => {
    setIsLilyChewing(true);
    const names = items.map((i) => i.name).join(" and ");
    setLilySpeech(`Munch, munch! Yummy ${names}! That is so delicious!`);
  };

  const handleMealComplete = (meal: MealType) => {
    const updated = completedMeals.includes(meal)
      ? completedMeals
      : [...completedMeals, meal];
    setCompletedMeals(updated);

    const newStars = stars + 2;
    setStars(newStars);
    saveProgress(newStars, updated);

    // If all 4 meals are completed, award full day certificate!
    if (updated.length >= 4) {
      setTimeout(() => {
        setShowCertificate(true);
        soundManager.playSuccessFanfare();
        soundManager.speak(
          "Hooray! You completed Lily's full day menu! Here is your Master Chef Starters Certificate!"
        );
      }, 2000);
    }
  };

  const handleAddNewFood = (item: FoodItemType) => {
    setFoodItems((prev) => [item, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <Header
        stars={stars}
        dressColor={dressColor}
        onToggleDress={handleToggleDress}
        isPro={isPro}
        onOpenProModal={() => setIsProModalOpen(true)}
      />

      {/* Main Tab Navigation */}
      <nav className="w-full border-b border-slate-200/80 bg-white/70 backdrop-blur-md shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto py-2">
          {[
            { id: "feed", label: "1. Feed Lily (Meals & Desserts)", icon: <Utensils className="w-4 h-4" /> },
            { id: "quiz", label: "2. Starters Book Quiz (Page 29 & 37)", icon: <BookOpen className="w-4 h-4" /> },
            { id: "dict", label: "3. Talking Food Dictionary (16 Words)", icon: <Library className="w-4 h-4" /> },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "pro" : "ghost"}
              size="sm"
              onClick={() => {
                setActiveTab(tab.id as "feed" | "quiz" | "dict");
                soundManager.playPop();
              }}
              className="flex items-center gap-2 whitespace-nowrap font-bold"
            >
              {tab.icon}
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>
      </nav>

      {/* Main Stage Grid */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Character Companion Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-4 flex flex-col">
          <CharacterLily
            dressColor={dressColor}
            speechText={lilySpeech}
            isChewing={isLilyChewing}
            onChewComplete={() => setIsLilyChewing(false)}
            onToggleDress={handleToggleDress}
          />
        </aside>

        {/* Right Interactive Game Viewport */}
        <section className="lg:col-span-8 xl:col-span-8">
          {activeTab === "feed" && (
            <FeedGame
              foodItems={foodItems}
              onFeedLily={handleFeedLily}
              onMealComplete={handleMealComplete}
              isPro={isPro}
              onOpenProModal={() => setIsProModalOpen(true)}
            />
          )}

          {activeTab === "quiz" && (
            <QuizGame onEarnStar={handleEarnStar} />
          )}

          {activeTab === "dict" && (
            <DictionaryView
              foodItems={foodItems}
              onAddNewFood={handleAddNewFood}
            />
          )}
        </section>
      </main>

      {/* Full Day Menu Certificate Modal */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-lg text-center items-center bg-white border-2 border-amber-300 shadow-2xl">
          <DialogHeader className="items-center text-center sm:text-center">
            <div className="inline-flex p-3 rounded-2xl bg-amber-100 text-amber-600 mb-2 shadow-xs">
              <Award className="w-12 h-12" />
            </div>
            <Badge variant="amber" className="tracking-widest uppercase">
              Cambridge Starters Certificate
            </Badge>
            <DialogTitle className="text-2xl font-black mt-2 text-slate-900">
              Full Day Master Chef Award! 🌟
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Congratulations! You fed Lily healthy breakfast, lunch, dinner, and sweet dessert!
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 border-y border-slate-100 flex items-center justify-center gap-8 w-full">
            <div>
              <span className="text-3xl font-black text-amber-600 block">{stars}</span>
              <span className="text-xs text-slate-500 font-semibold">Total Stars</span>
            </div>
            <div>
              <span className="text-3xl font-black text-emerald-600 block">4 / 4</span>
              <span className="text-xs text-slate-500 font-semibold">Meals Completed</span>
            </div>
          </div>

          <Button
            variant="amber"
            size="lg"
            onClick={() => setShowCertificate(false)}
            className="w-full font-black text-sm shadow-md"
          >
            Collect My Trophy & Play Again! 🏆
          </Button>
        </DialogContent>
      </Dialog>

      {/* Pro Modal */}
      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        isPro={isPro}
      />
    </div>
  );
}
