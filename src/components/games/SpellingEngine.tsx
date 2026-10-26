"use client";

import React, { useState, useEffect } from "react";
import { VocabularyItemType } from "@/types";
import { soundManager } from "@/lib/audio";
import { Volume2, Sparkles, RotateCcw, CheckCircle2, Lightbulb, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SpellingEngineProps {
  items: VocabularyItemType[];
  onEarnStar?: () => void;
}

interface LetterTile {
  id: string;
  char: string;
  isPlaced: boolean;
}

export const SpellingEngine: React.FC<SpellingEngineProps> = ({ items, onEarnStar }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledTiles, setScrambledTiles] = useState<LetterTile[]>([]);
  const [placedTiles, setPlacedTiles] = useState<LetterTile[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedAll, setCompletedAll] = useState(false);

  const currentItem = items[currentIndex];

  // Initialize word tiles when currentItem changes
  useEffect(() => {
    if (!currentItem) return;

    const rawLetters = currentItem.word.toUpperCase().replace(/[^A-Z]/g, "").split("");
    
    // Scramble deterministic or pseudo-random
    const indexedTiles: LetterTile[] = rawLetters.map((char, i) => ({
      id: `${char}-${i}`,
      char,
      isPlaced: false,
    }));

    // Shuffle
    const shuffled = [...indexedTiles].sort(() => Math.random() - 0.5);
    setScrambledTiles(shuffled);
    setPlacedTiles([]);
    setIsSuccess(false);
    setShowHint(false);

    soundManager.speak(`Can you spell ${currentItem.displayName}?`);
  }, [currentIndex, currentItem]);

  // Handle clicking a letter tile in the scrambled bank
  const handleSelectTile = (tile: LetterTile) => {
    if (tile.isPlaced || isSuccess) return;

    soundManager.playPop();

    // Mark as placed
    setScrambledTiles((prev) =>
      prev.map((t) => (t.id === tile.id ? { ...t, isPlaced: true } : t))
    );

    const nextPlaced = [...placedTiles, tile];
    setPlacedTiles(nextPlaced);

    // Check if word is completed
    const targetWord = currentItem.word.toUpperCase().replace(/[^A-Z]/g, "");
    if (nextPlaced.length === targetWord.length) {
      const spelled = nextPlaced.map((t) => t.char).join("");
      if (spelled === targetWord) {
        // Correct!
        setIsSuccess(true);
        soundManager.playSuccessFanfare();
        soundManager.speak(`Super! You spelled ${currentItem.displayName}!`);
        onEarnStar?.();

        setTimeout(() => {
          if (currentIndex < items.length - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            setCompletedAll(true);
          }
        }, 1800);
      } else {
        // Incorrect
        soundManager.playError();
        soundManager.speak("Oops! Let's try unscrambling again!");
      }
    }
  };

  // Handle removing a placed tile
  const handleRemovePlacedTile = (tile: LetterTile) => {
    if (isSuccess) return;

    soundManager.playPop();

    setPlacedTiles((prev) => prev.filter((t) => t.id !== tile.id));
    setScrambledTiles((prev) =>
      prev.map((t) => (t.id === tile.id ? { ...t, isPlaced: false } : t))
    );
  };

  // Reset current word
  const handleResetWord = () => {
    soundManager.playPop();
    setPlacedTiles([]);
    setScrambledTiles((prev) => prev.map((t) => ({ ...t, isPlaced: false })));
  };

  if (!currentItem) {
    return (
      <div className="text-center py-12 text-slate-500">
        No spelling words available for this unit.
      </div>
    );
  }

  if (completedAll) {
    return (
      <Card className="max-w-md mx-auto p-8 text-center bg-white rounded-3xl shadow-xl border-2 border-emerald-300">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
          <Award className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-2">Spelling Master! 🏆</h3>
        <p className="text-slate-600 mb-6">
          You unscrambled all {items.length} words in this unit!
        </p>
        <Button
          className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6"
          onClick={() => {
            setCurrentIndex(0);
            setCompletedAll(false);
          }}
        >
          Play Again
        </Button>
      </Card>
    );
  }

  const targetLength = currentItem.word.toUpperCase().replace(/[^A-Z]/g, "").length;

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full px-4 py-4">
      {/* Word Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <Badge variant="outline" className="border-pink-300 text-pink-700 text-xs font-bold">
          Word {currentIndex + 1} of {items.length}
        </Badge>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-amber-700 hover:bg-amber-50"
            onClick={() => {
              setShowHint(!showHint);
              soundManager.speak(currentItem.phonics);
            }}
          >
            <Lightbulb className="w-4 h-4 mr-1 text-amber-500" />
            Hint
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-slate-500 hover:bg-slate-100"
            onClick={handleResetWord}
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Center Word Card */}
      <Card className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-pink-100 text-center flex flex-col items-center">
        {/* Visual Item Display */}
        <div className="w-28 h-28 mb-3 flex items-center justify-center">
          {currentItem.svg ? (
            <div
              className="w-full h-full drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: currentItem.svg }}
            />
          ) : currentItem.imageUrl ? (
            <img
              src={currentItem.imageUrl}
              alt={currentItem.displayName}
              className="w-full h-full object-contain rounded-xl"
            />
          ) : (
            <div className="w-24 h-24 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 font-extrabold text-2xl">
              ?
            </div>
          )}
        </div>

        {/* Audio Button */}
        <Button
          size="sm"
          variant="outline"
          className="rounded-full mb-4 border-pink-200 text-pink-700 hover:bg-pink-50 font-bold"
          onClick={() => soundManager.speak(currentItem.displayName)}
        >
          <Volume2 className="w-4 h-4 mr-1.5" />
          Hear Word: {currentItem.displayName}
        </Button>

        {/* Hint Callout */}
        {showHint && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl px-4 py-2 text-xs mb-4 animate-fade-in font-medium">
            💡 Phonics: <span className="font-bold">{currentItem.phonics}</span> — &ldquo;{currentItem.exampleSentence}&rdquo;
          </div>
        )}

        {/* Target Slots (Placed Tiles) */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 min-h-[56px] items-center">
          {Array.from({ length: targetLength }).map((_, slotIdx) => {
            const placed = placedTiles[slotIdx];
            return (
              <button
                key={`slot-${slotIdx}`}
                onClick={() => placed && handleRemovePlacedTile(placed)}
                className={`w-12 h-14 md:w-14 md:h-16 rounded-2xl flex items-center justify-center font-black text-2xl transition-all ${
                  placed
                    ? isSuccess
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-105"
                      : "bg-linear-to-b from-pink-500 to-rose-600 text-white shadow-md shadow-pink-200 cursor-pointer active:scale-95"
                    : "border-2 border-dashed border-slate-300 bg-slate-50 text-slate-300"
                }`}
              >
                {placed ? placed.char : ""}
              </button>
            );
          })}
        </div>

        {/* Scrambled Tile Bank */}
        <div className="w-full pt-4 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Tap letters to spell the word
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {scrambledTiles.map((tile) => (
              <button
                key={tile.id}
                onClick={() => handleSelectTile(tile)}
                disabled={tile.isPlaced || isSuccess}
                className={`w-12 h-13 md:w-13 md:h-15 rounded-2xl font-black text-xl flex items-center justify-center transition-all ${
                  tile.isPlaced
                    ? "opacity-20 bg-slate-200 cursor-default"
                    : "bg-white text-slate-800 border-2 border-slate-200 shadow-md hover:border-pink-400 hover:shadow-lg active:scale-90 cursor-pointer"
                }`}
              >
                {tile.char}
              </button>
            ))}
          </div>
        </div>

        {/* Success Feedback */}
        {isSuccess && (
          <div className="mt-4 flex items-center gap-2 text-emerald-600 font-extrabold animate-pop-in">
            <CheckCircle2 className="w-5 h-5" />
            <span>Awesome! +1 Star ⭐</span>
          </div>
        )}
      </Card>
    </div>
  );
};
