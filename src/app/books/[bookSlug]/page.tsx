"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BookType, UnitType } from "@/types";
import { getBookUnitsAction } from "@/actions/curriculum";
import { Header } from "@/components/Header";
import { CharacterLily } from "@/components/CharacterLily";
import { soundManager } from "@/lib/audio";
import {
  ChevronLeft,
  BookOpen,
  Sparkles,
  Award,
  ArrowRight,
  GraduationCap,
  Users,
  Gamepad2,
  Utensils,
  Heart,
  Shirt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Gamepad2: <Gamepad2 className="w-6 h-6" />,
  Utensils: <Utensils className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Shirt: <Shirt className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
};

export default function BookRoadmapPage() {
  const params = useParams();
  const router = useRouter();
  const bookSlug = (params.bookSlug as string) || "starters";

  const [book, setBook] = useState<BookType | null>(null);
  const [units, setUnits] = useState<UnitType[]>([]);
  const [loading, setLoading] = useState(true);
  const [stars, setStars] = useState(0);
  const [dressColor, setDressColor] = useState<"pink" | "purple">("pink");
  const [lilySpeech, setLilySpeech] = useState(
    "Welcome to our learning adventure! Tap any unit to start learning vocabularies!"
  );

  useEffect(() => {
    async function loadRoadmap() {
      try {
        const res = await getBookUnitsAction(bookSlug);
        if (res.success && res.data) {
          setBook(res.data.book);
          setUnits(res.data.units);
          soundManager.speak(
            `Welcome to ${res.data.book.title}! All units are ready for you!`
          );
        }
      } catch (e) {
        console.error("Error loading book units:", e);
      } finally {
        setLoading(false);
      }

      // Load progress
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
    loadRoadmap();
  }, [bookSlug]);

  const handleToggleDress = () => {
    setDressColor((prev) => (prev === "pink" ? "purple" : "pink"));
    soundManager.speak(
      `Look! I'm wearing my ${dressColor === "pink" ? "purple" : "pink"} dress now!`
    );
  };

  const handleSelectUnit = (unit: UnitType) => {
    soundManager.playPop();
    soundManager.speak(`Let's explore Unit ${unit.unitNumber}: ${unit.title}!`);
    router.push(`/books/${bookSlug}/units/${unit.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-bold">Loading Cambridge Learning Roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        stars={stars}
        dressColor={dressColor}
        onToggleDress={handleToggleDress}
        isPro={true}
        onOpenProModal={() => {}}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 w-full flex-1">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="text-berry-primary border-pink-200 hover:bg-pink-50 font-bold rounded-full"
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              All 3 Books
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="text-slate-600 hover:text-slate-900 font-bold rounded-full"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Feed & Play
            </Button>
          </div>

          <Badge className="bg-pink-100 text-pink-700 border-pink-300 text-xs font-bold px-3 py-1">
            Cambridge Pathway • {book?.level || "Pre-A1"}
          </Badge>
        </div>

        {/* Hero Section with Companion Lily */}
        <Card className="p-6 md:p-8 rounded-3xl bg-linear-to-r from-pink-100/90 via-purple-100/70 to-indigo-100/90 border-2 border-pink-200/80 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 md:w-36 shrink-0">
              <CharacterLily
                speechText={lilySpeech}
                dressColor={dressColor}
                isChewing={false}
                onChewComplete={() => {}}
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Badge className="bg-pink-600 text-white font-extrabold text-xs">
                  {book?.series || "Starters"}
                </Badge>
                <span className="text-xs font-bold text-slate-500">
                  Ages {book?.targetAge || "3-8"}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">
                {book?.title || "Get Ready for Starters"}
              </h1>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl">
                {book?.description ||
                  "Choose a unit below to learn vocabulary, practice interactive 3D flashcards, and play thematic mini-games!"}
              </p>
            </div>
          </div>
        </Card>

        {/* Roadmap Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Adventure Units (All Unlocked 🔓)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tap any unit to explore its vocabularies, flashcard deck, and games!
            </p>
          </div>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {units.map((unit) => {
            const iconComponent = ICON_MAP[unit.icon] || <BookOpen className="w-6 h-6" />;
            const wordCount = unit.wordCount ?? 0;
            const isPlayable = wordCount > 0;

            return (
              <Card
                key={unit.id}
                onClick={() => handleSelectUnit(unit)}
                className={`p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:scale-102 hover:shadow-xl ${
                  isPlayable
                    ? "border-pink-400 bg-white shadow-lg ring-2 ring-pink-300/50"
                    : "border-slate-200/80 bg-white/95 hover:border-purple-300 shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: unit.themeColor || "#ec4899" }}
                    >
                      {iconComponent}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isPlayable ? (
                        <Badge className="bg-pink-600 text-white font-black text-[10px] uppercase">
                          ★ {wordCount} Words
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px] text-slate-400 font-bold">
                          Unit {unit.unitNumber}
                        </Badge>
                      )}
                      {isPlayable && (
                        <Badge variant="outline" className="text-xs font-bold text-slate-600">
                          Unit {unit.unitNumber}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-slate-800 mb-1.5">{unit.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {unit.description || "Learn core vocabulary, flashcards, and interactive games."}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                    <span>3 Steps:</span>
                    <span className="text-pink-600">Learn</span> •{" "}
                    <span className="text-blue-600">Cards</span> •{" "}
                    <span className="text-purple-600">Play</span>
                  </div>

                  <Button
                    size="sm"
                    className="rounded-full bg-slate-900 hover:bg-pink-600 text-white font-bold text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectUnit(unit);
                    }}
                  >
                    Start
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
