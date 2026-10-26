"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FullUnitPayload, FoodItemType, MealType, VocabularyItemType } from "@/types";
import { getUnitPayloadAction } from "@/actions/curriculum";
import { saveUnitProgressAction } from "@/actions/progress";
import { Header } from "@/components/Header";
import { CharacterLily } from "@/components/CharacterLily";
import { VocabularyLearnStudio } from "@/components/VocabularyLearnStudio";
import { FlashcardEngine } from "@/components/games/FlashcardEngine";
import { SpellingEngine } from "@/components/games/SpellingEngine";
import { MemoryMatchEngine } from "@/components/games/MemoryMatchEngine";
import { UnitGameRegistry } from "@/components/games/UnitGameRegistry";
import { QuizGame } from "@/components/QuizGame";
import { soundManager } from "@/lib/audio";
import {
  ChevronLeft,
  BookOpen,
  Layers,
  Gamepad2,
  Sparkles,
  HelpCircle,
  Puzzle,
  Utensils,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function UnitHubPage() {
  const params = useParams();
  const router = useRouter();
  const bookSlug = (params.bookSlug as string) || "starters";
  const unitSlug = (params.unitSlug as string) || "unit-4-food";

  const [payload, setPayload] = useState<FullUnitPayload | null>(null);
  const [loading, setLoading] = useState(true);

  // 3-Step Navigation: "learn" | "flashcards" | "games"
  const [activeStep, setActiveStep] = useState<"learn" | "flashcards" | "games">("learn");
  // Sub-game inside Step 3: "thematic" | "spelling" | "memory" | "quiz"
  const [activeGame, setActiveGame] = useState<"thematic" | "spelling" | "memory" | "quiz">("thematic");

  // Character & Progress State
  const [stars, setStars] = useState(0);
  const [dressColor, setDressColor] = useState<"pink" | "purple">("pink");
  const [lilySpeech, setLilySpeech] = useState("Hi! Let's start learning our vocabulary!");
  const [isLilyChewing, setIsLilyChewing] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Fetch unit payload on mount
  useEffect(() => {
    async function loadUnit() {
      try {
        const res = await getUnitPayloadAction(bookSlug, unitSlug);
        if (res.success && res.data) {
          setPayload(res.data);
          setLilySpeech(
            `Welcome to Unit ${res.data.unit.unitNumber}: ${res.data.unit.title}! Let's learn these words together!`
          );
          soundManager.speak(
            `Unit ${res.data.unit.unitNumber}: ${res.data.unit.title}!`
          );
        }
      } catch (err) {
        console.error("Could not load unit:", err);
      } finally {
        setLoading(false);
      }

      // Fetch user stars
      try {
        const progRes = await fetch("/api/user/progress");
        if (progRes.ok) {
          const progData = await progRes.json();
          if (progData.stars) setStars(progData.stars);
        }
      } catch {
        // Fallback
      }
    }
    loadUnit();
  }, [bookSlug, unitSlug]);

  const handleToggleDress = () => {
    setDressColor((prev) => (prev === "pink" ? "purple" : "pink"));
    soundManager.speak(
      `Look! I'm wearing my ${dressColor === "pink" ? "purple" : "pink"} dress now!`
    );
  };

  const handleEarnStar = async () => {
    const nextStars = stars + 1;
    setStars(nextStars);
    soundManager.playSuccessFanfare();

    if (payload?.unit.id) {
      try {
        await saveUnitProgressAction({
          unitId: payload.unit.id,
          starsDelta: 1,
        });
      } catch {
        // Offline fallback
      }
    }
  };

  const handleFeedLily = (items: FoodItemType[]) => {
    setIsLilyChewing(true);
    const names = items.map((i) => i.name).join(" and ");
    setLilySpeech(`Munch, munch! Yummy ${names}! That is so delicious!`);
  };

  const handleMealComplete = (meal: MealType) => {
    handleEarnStar();
    setLilySpeech(`Hooray! You finished the ${meal} plate! Here's a star! ⭐`);
  };

  const handleAddNewWord = (newWord: VocabularyItemType) => {
    if (!payload) return;
    setPayload({
      ...payload,
      vocabulary: [newWord, ...payload.vocabulary],
    });
  };

  if (loading || !payload) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-bold">Loading Unit...</p>
        </div>
      </div>
    );
  }

  const hasQuiz = payload.quizQuestions && payload.quizQuestions.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        stars={stars}
        dressColor={dressColor}
        onToggleDress={handleToggleDress}
        isPro={true}
        onOpenProModal={() => {}}
      />

      {/* Top Unit Banner */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/books/${bookSlug}`)}
              className="text-slate-600 hover:text-slate-900 font-bold text-xs"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {payload.book.title}
            </Button>

            <span className="text-slate-300">|</span>

            <div className="flex items-center gap-2">
              <Badge
                className="text-white text-xs font-bold"
                style={{ backgroundColor: payload.unit.themeColor || "#ec4899" }}
              >
                Unit {payload.unit.unitNumber}
              </Badge>
              <h1 className="font-black text-slate-800 text-base md:text-lg">
                {payload.unit.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-bold text-emerald-700 border-emerald-200">
              {payload.vocabulary.length} Words
            </Badge>
          </div>
        </div>
      </div>

      {/* 3-Step Navigation Bar */}
      <div className="w-full bg-linear-to-r from-pink-50 via-purple-50 to-blue-50 border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-center gap-2 md:gap-4">
          {[
            {
              id: "learn",
              label: "Step 1: 📖 Learn",
              desc: "Vocabulary & Sound",
              icon: <BookOpen className="w-4 h-4" />,
            },
            {
              id: "flashcards",
              label: "Step 2: 🃏 Flashcards",
              desc: "Interactive Practice",
              icon: <Layers className="w-4 h-4" />,
            },
            {
              id: "games",
              label: "Step 3: 🎮 Play",
              desc: "Games & Quiz Arena",
              icon: <Gamepad2 className="w-4 h-4" />,
            },
          ].map((tab) => {
            const isActive = activeStep === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playPop();
                  setActiveStep(tab.id as "learn" | "flashcards" | "games");
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-300 scale-102"
                    : "bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Stage */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1">
        {/* Companion Bar */}
        {/* <div className="max-w-4xl mx-auto mb-6 bg-white/90 backdrop-blur-sm p-4 rounded-3xl border border-pink-100 shadow-md flex items-center gap-4">
          <div className="w-20 md:w-24 shrink-0">
            <CharacterLily
              speechText={lilySpeech}
              dressColor={dressColor}
              isChewing={isLilyChewing}
              onChewComplete={() => setIsLilyChewing(false)}
            />
          </div>
          <div className="flex-1">
            <p className="text-sm md:text-base font-bold text-slate-700 leading-relaxed">
              &ldquo;{lilySpeech}&rdquo;
            </p>
          </div>
        </div> */}

        {/* STEP 1: LEARN STUDIO */}
        {activeStep === "learn" && (
          <VocabularyLearnStudio
            vocabulary={payload.vocabulary}
            unitTitle={payload.unit.title}
            onAddNewWord={handleAddNewWord}
          />
        )}

        {/* STEP 2: FLASHCARD STUDIO */}
        {activeStep === "flashcards" && (
          <FlashcardEngine
            items={payload.vocabulary}
            unitTitle={payload.unit.title}
            onEarnStar={handleEarnStar}
            wordProgressMap={payload.wordProgress}
          />
        )}

        {/* STEP 3: PLAY GAMES ARENA */}
        {activeStep === "games" && (
          <div className="flex flex-col items-center">
            {/* Sub-Game Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Button
                size="sm"
                variant={activeGame === "thematic" ? "default" : "outline"}
                className={
                  activeGame === "thematic"
                    ? "bg-pink-600 text-white font-bold"
                    : "border-slate-300 font-bold"
                }
                onClick={() => {
                  soundManager.playPop();
                  setActiveGame("thematic");
                }}
              >
                <Utensils className="w-4 h-4 mr-1.5" />
                Thematic Unit Game
              </Button>

              <Button
                size="sm"
                variant={activeGame === "spelling" ? "default" : "outline"}
                className={
                  activeGame === "spelling"
                    ? "bg-purple-600 text-white font-bold"
                    : "border-slate-300 font-bold"
                }
                onClick={() => {
                  soundManager.playPop();
                  setActiveGame("spelling");
                }}
              >
                <Puzzle className="w-4 h-4 mr-1.5" />
                Spelling Anagrams
              </Button>

              <Button
                size="sm"
                variant={activeGame === "memory" ? "default" : "outline"}
                className={
                  activeGame === "memory"
                    ? "bg-indigo-600 text-white font-bold"
                    : "border-slate-300 font-bold"
                }
                onClick={() => {
                  soundManager.playPop();
                  setActiveGame("memory");
                }}
              >
                <Sparkles className="w-4 h-4 mr-1.5" />
                Memory Match
              </Button>

              {hasQuiz && (
                <Button
                  size="sm"
                  variant={activeGame === "quiz" ? "default" : "outline"}
                  className={
                    activeGame === "quiz"
                      ? "bg-amber-600 text-white font-bold"
                      : "border-slate-300 font-bold"
                  }
                  onClick={() => {
                    soundManager.playPop();
                    setActiveGame("quiz");
                  }}
                >
                  <HelpCircle className="w-4 h-4 mr-1.5" />
                  Cambridge Practice Quiz
                </Button>
              )}
            </div>

            {/* Active Game Display */}
            <div className="w-full">
              {activeGame === "thematic" && (
                <UnitGameRegistry
                  unitId={payload.unit.id}
                  items={payload.vocabulary}
                  onFeedLily={handleFeedLily}
                  onMealComplete={handleMealComplete}
                  onEarnStar={handleEarnStar}
                  isPro={true}
                />
              )}

              {activeGame === "spelling" && (
                <SpellingEngine
                  items={payload.vocabulary}
                  onEarnStar={handleEarnStar}
                />
              )}

              {activeGame === "memory" && (
                <MemoryMatchEngine
                  items={payload.vocabulary}
                  onEarnStar={handleEarnStar}
                />
              )}

              {activeGame === "quiz" && hasQuiz && (
                <QuizGame
                  onEarnStar={handleEarnStar}
                  questions={payload.quizQuestions}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Full Day Completion Certificate Dialog */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="sm:max-w-[550px] bg-linear-to-b from-amber-50 to-orange-50 border-4 border-amber-300 rounded-3xl p-8 text-center shadow-2xl">
          <DialogHeader>
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Award className="w-12 h-12 text-amber-600" />
            </div>
            <DialogTitle className="text-3xl font-black text-amber-900 tracking-wide">
              Official Master Certificate! 🌟
            </DialogTitle>
            <DialogDescription className="text-slate-700 text-base mt-2">
              Presented to our Star Learner for outstanding English vocabulary mastery in{" "}
              <strong>{payload.unit.title}</strong>!
            </DialogDescription>
          </DialogHeader>

          <div className="my-6 p-4 bg-white/80 rounded-2xl border border-amber-200">
            <p className="text-sm font-semibold text-slate-600">
              Cambridge Young Learners English Pathway
            </p>
            <p className="text-2xl font-extrabold text-pink-600 mt-1">
              {payload.book.title}
            </p>
          </div>

          <Button
            onClick={() => setShowCertificate(false)}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-lg py-6 rounded-2xl shadow-lg shadow-amber-300"
          >
            Hooray! Keep Learning! 🎉
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
