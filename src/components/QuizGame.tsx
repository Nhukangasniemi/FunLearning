"use client";

import React, { useState } from "react";
import { BOOK_QUIZ_QUESTIONS } from "@/data/quizQuestions";
import { SPELLING_PUZZLES } from "@/data/spellingPuzzles";
import { FOOD_ITEMS } from "@/data/foodItems";
import { soundManager } from "@/lib/audio";
import { Volume2, CheckCircle2, BookOpen, Sparkles, HelpCircle } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuizGameProps {
  onEarnStar: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ onEarnStar }) => {
  const [activeTab, setActiveTab] = useState<"book" | "spelling" | "riddle">("book");

  // Book Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);

  // Spelling Puzzle State
  const [spellingIndex, setSpellingIndex] = useState(0);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);

  // AI Riddle State
  const [riddleFood, setRiddleFood] = useState("banana");
  const [currentRiddle, setCurrentRiddle] = useState<{ riddle: string; hint: string } | null>(null);
  const [loadingRiddle, setLoadingRiddle] = useState(false);

  const currentQ = BOOK_QUIZ_QUESTIONS[currentQIndex];
  const currentSpelling = SPELLING_PUZZLES[spellingIndex];

  // --- Handlers for Book Quiz ---
  const handlePlayAudio = () => {
    soundManager.speak(currentQ.audioTranscript);
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswerChecked) return;
    soundManager.playPop();

    if (currentQ.multiChoice) {
      setSelectedMulti((prev) =>
        prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
      );
    } else {
      setSelectedOption(optId);
    }
  };

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true);

    let isCorrect = false;
    if (currentQ.multiChoice) {
      const correctFruits = currentQ.fruitsInBag || [];
      const hasAll =
        correctFruits.every((f) => selectedMulti.includes(f)) &&
        selectedMulti.length === correctFruits.length;
      isCorrect = hasAll;
    } else {
      isCorrect = selectedOption === currentQ.correctOption;
    }

    if (isCorrect) {
      soundManager.playSuccessFanfare();
      soundManager.speak(`Brilliant! Correct! ${currentQ.explanation}`);
      onEarnStar();
    } else {
      soundManager.playError();
      soundManager.speak(`Good try! ${currentQ.explanation}`);
    }
  };

  const handleNextQuestion = () => {
    soundManager.playPop();
    setIsAnswerChecked(false);
    setSelectedOption(null);
    setSelectedMulti([]);
    setCurrentQIndex((prev) => (prev + 1) % BOOK_QUIZ_QUESTIONS.length);
  };

  // --- Handlers for Spelling Challenge ---
  const currentSpellingFood = FOOD_ITEMS.find((f) => f.id === currentSpelling.foodId);

  const handleTapTile = (letter: string) => {
    if (placedLetters.length >= currentSpelling.letters.length) return;
    soundManager.playPop();
    soundManager.speak(letter);

    const nextLetters = [...placedLetters, letter];
    setPlacedLetters(nextLetters);

    if (nextLetters.length === currentSpelling.letters.length) {
      const spelled = nextLetters.join("");
      if (spelled === currentSpelling.word) {
        soundManager.playSuccessFanfare();
        soundManager.speak(`Super! You spelled ${currentSpelling.word}!`);
        onEarnStar();
      } else {
        soundManager.playError();
        soundManager.speak("Try again! Reset the letters.");
      }
    }
  };

  const handleResetSpelling = () => {
    soundManager.playPop();
    setPlacedLetters([]);
  };

  const handleNextSpelling = () => {
    soundManager.playPop();
    setPlacedLetters([]);
    setSpellingIndex((prev) => (prev + 1) % SPELLING_PUZZLES.length);
  };

  // --- Handlers for AI Phonics Riddle ---
  const handleFetchRiddle = async (food: string) => {
    setLoadingRiddle(true);
    soundManager.playChime();
    setRiddleFood(food);

    try {
      const res = await fetch("/api/ai/riddle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodName: food }),
      });
      const data = await res.json();
      setCurrentRiddle({ riddle: data.riddle, hint: data.hint });
      soundManager.speak(data.riddle);
    } catch {
      setCurrentRiddle({
        riddle: "I am yellow, sweet, and monkeys love to peel me! What am I?",
        hint: "Starts with B!",
      });
    } finally {
      setLoadingRiddle(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-100/90 border border-slate-200 rounded-2xl shadow-xs">
        <Button
          variant={activeTab === "book" ? "default" : "ghost"}
          size="sm"
          onClick={() => {
            setActiveTab("book");
            soundManager.playPop();
          }}
          className="flex-1"
        >
          <BookOpen className="w-4 h-4" />
          <span>Starters Book Questions (Page 29 & 37)</span>
        </Button>

        <Button
          variant={activeTab === "spelling" ? "destructive" : "ghost"}
          size="sm"
          onClick={() => {
            setActiveTab("spelling");
            soundManager.playPop();
          }}
          className="flex-1"
        >
          <Sparkles className="w-4 h-4" />
          <span>Word Spelling Tiles</span>
        </Button>

        <Button
          variant={activeTab === "riddle" ? "amber" : "ghost"}
          size="sm"
          onClick={() => {
            setActiveTab("riddle");
            soundManager.playPop();
          }}
          className="flex-1"
        >
          <HelpCircle className="w-4 h-4" />
          <span>AI Riddles ✨</span>
        </Button>
      </div>

      {/* Mode 1: Starters Book Quiz */}
      {activeTab === "book" && (
        <Card className="p-6 space-y-6 shadow-md bg-white border-slate-200/90">
          {/* Header Info */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <Badge variant="blue" className="uppercase font-bold tracking-wide">
                {currentQ.bookPage} · {currentQ.part}
              </Badge>
              <CardTitle className="text-xl mt-2 text-slate-900">
                {currentQ.question}
              </CardTitle>
            </div>
            <Badge variant="secondary">
              Question {currentQIndex + 1} of {BOOK_QUIZ_QUESTIONS.length}
            </Badge>
          </div>

          {/* Audio Transcript Listening Box */}
          <Card className="bg-sky-50 border-sky-200/80 p-4 flex flex-col sm:flex-row items-center gap-4 shadow-xs">
            <Button
              variant="default"
              onClick={handlePlayAudio}
              className="bg-blue-600 hover:bg-blue-500 shrink-0 text-white shadow-md"
            >
              <Volume2 className="w-5 h-5" />
              <span>Listen to Cambridge Audio Track 🎧</span>
            </Button>
            <p className="text-xs text-slate-700 italic font-medium">
              &ldquo;{currentQ.audioTranscript}&rdquo;
            </p>
          </Card>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentQ.options.map((opt) => {
              const food = FOOD_ITEMS.find((f) => f.id === (opt.foodId || opt.combo?.[0]));
              const isSelected = currentQ.multiChoice
                ? selectedMulti.includes(opt.id)
                : selectedOption === opt.id;

              return (
                <Card
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 cursor-pointer transition-all duration-200 flex flex-col items-center select-none relative bg-white ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/70 shadow-md ring-2 ring-blue-300 scale-[1.02]"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs"
                  }`}
                >
                  <div className="w-20 h-20 mb-3" dangerouslySetInnerHTML={{ __html: food?.svg || "" }} />
                  <span className="text-base font-bold text-slate-900">{opt.text}</span>
                  <Badge variant="secondary" className="mt-1 text-[10px]">
                    Option {opt.id}
                  </Badge>
                  {isSelected && (
                    <div className="absolute top-3 right-3 text-blue-600">
                      <CheckCircle2 className="w-5 h-5 fill-blue-100" />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Actions & Result */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {!isAnswerChecked ? (
              <Button
                variant="candy"
                size="lg"
                onClick={handleCheckAnswer}
                disabled={currentQ.multiChoice ? selectedMulti.length === 0 : !selectedOption}
                className="font-black"
              >
                Check Answer (✓)
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-emerald-600">
                  {currentQ.explanation}
                </p>
                <Button
                  variant="default"
                  onClick={handleNextQuestion}
                  className="bg-blue-600 hover:bg-blue-500 font-bold"
                >
                  Next Question →
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Mode 2: Spelling Challenge */}
      {activeTab === "spelling" && (
        <Card className="p-6 space-y-6 shadow-md bg-white border-slate-200/90 flex flex-col items-center">
          <div className="w-full flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <Badge variant="destructive" className="uppercase">
                Cambridge Starters Spelling
              </Badge>
              <CardTitle className="text-xl mt-2 text-slate-900">
                Spell: {currentSpelling.hint}
              </CardTitle>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleNextSpelling}
            >
              Skip Word →
            </Button>
          </div>

          {/* Illustration */}
          <div
            className="w-24 h-24 my-2"
            dangerouslySetInnerHTML={{ __html: currentSpellingFood?.svg || "" }}
          />

          {/* Placed Letter Slots */}
          <div className="flex gap-2">
            {currentSpelling.letters.map((_, idx) => (
              <div
                key={idx}
                className="w-14 h-16 border-2 border-rose-300 bg-rose-50/50 rounded-2xl flex items-center justify-center text-2xl font-black text-rose-700 shadow-inner"
              >
                {placedLetters[idx] || ""}
              </div>
            ))}
          </div>

          {/* Tile Picker */}
          <div className="flex flex-wrap gap-2 justify-center max-w-sm mt-4">
            {[...currentSpelling.letters]
              .sort(() => 0.5 - Math.random())
              .map((letter, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="icon"
                  onClick={() => handleTapTile(letter)}
                  className="w-12 h-12 text-lg font-black bg-white hover:border-rose-400 hover:bg-rose-50 text-slate-800 hover:scale-110 active:scale-95 shadow-sm"
                >
                  {letter}
                </Button>
              ))}
          </div>

          <Button
            variant="link"
            size="sm"
            onClick={handleResetSpelling}
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            Reset letters
          </Button>
        </Card>
      )}

      {/* Mode 3: AI Phonics Riddle */}
      {activeTab === "riddle" && (
        <Card className="p-6 space-y-6 shadow-md bg-white border-slate-200/90">
          <div>
            <Badge variant="amber" className="uppercase">
              Pro AI Feature (OpenAI gpt-5-nano)
            </Badge>
            <CardTitle className="text-xl mt-2 text-slate-900">
              Interactive Phonics Riddle Game
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              Pick a food and let AI create a rhyming riddle for practice!
            </p>
          </div>

          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
            {FOOD_ITEMS.filter((f) => f.isFromBook).map((f) => (
              <Button
                key={f.id}
                variant={riddleFood === f.name ? "amber" : "outline"}
                size="sm"
                onClick={() => handleFetchRiddle(f.name)}
                disabled={loadingRiddle}
              >
                {f.displayName}
              </Button>
            ))}
          </div>

          {currentRiddle && (
            <Card className="bg-amber-50/90 border-amber-200 p-5 space-y-3 shadow-xs">
              <p className="text-base font-bold text-amber-950">
                &ldquo;{currentRiddle.riddle}&rdquo;
              </p>
              <p className="text-xs font-semibold text-amber-800">
                💡 Hint: {currentRiddle.hint}
              </p>
              <Button
                variant="link"
                size="sm"
                onClick={() => soundManager.speak(currentRiddle.riddle)}
                className="text-xs text-amber-700 p-0 h-auto flex items-center gap-1 font-bold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear AI Riddle</span>
              </Button>
            </Card>
          )}
        </Card>
      )}
    </div>
  );
};
