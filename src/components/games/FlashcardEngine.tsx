"use client";

import React, { useState, useEffect, useCallback } from "react";
import { VocabularyItemType, WordProgressType } from "@/types";
import { soundManager } from "@/lib/audio";
import {
  Volume2,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Headphones,
  Eye,
  Star,
  Award,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateWordMasteryAction, getSmartReviewWordsAction } from "@/actions/progress";

interface FlashcardEngineProps {
  items: VocabularyItemType[];
  unitTitle: string;
  onEarnStar?: () => void;
  wordProgressMap?: Record<string, WordProgressType>;
}

export const FlashcardEngine: React.FC<FlashcardEngineProps> = ({
  items,
  unitTitle,
  onEarnStar,
  wordProgressMap = {},
}) => {
  const [activeDeck, setActiveDeck] = useState<"unit" | "smartReview">("unit");
  const [smartReviewWords, setSmartReviewWords] = useState<VocabularyItemType[]>([]);
  const [loadingSmartReview, setLoadingSmartReview] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isListenMode, setIsListenMode] = useState(false);
  const [completedDeck, setCompletedDeck] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  const currentDeck = activeDeck === "unit" ? items : smartReviewWords;
  const currentItem = currentDeck[currentIndex];

  // Load Smart Review words if selected
  const handleSelectSmartReview = async () => {
    setActiveDeck("smartReview");
    setLoadingSmartReview(true);
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompletedDeck(false);

    try {
      const res = await getSmartReviewWordsAction();
      if (res.success && res.data && res.data.words.length > 0) {
        setSmartReviewWords(res.data.words);
        soundManager.speak("Loading your Daily Smart Review flashcards!");
      } else {
        soundManager.speak("Great job! You have mastered all words. Practicing unit words instead!");
        setActiveDeck("unit");
      }
    } catch {
      setActiveDeck("unit");
    } finally {
      setLoadingSmartReview(false);
    }
  };

  const handleSelectUnitDeck = () => {
    setActiveDeck("unit");
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompletedDeck(false);
  };

  // Speak word when card changes
  const playWordAudio = useCallback(
    (item: VocabularyItemType) => {
      soundManager.playPop();
      soundManager.speak(`${item.displayName}. ${item.exampleSentence}`);
    },
    []
  );

  useEffect(() => {
    if (currentItem && !isListenMode) {
      // Auto speak word name lightly
      soundManager.speak(currentItem.displayName);
    } else if (currentItem && isListenMode) {
      soundManager.speak(currentItem.displayName);
    }
    setIsFlipped(false);
  }, [currentIndex, isListenMode, currentItem]);

  // Flip card
  const handleFlipCard = () => {
    soundManager.playChime();
    setIsFlipped((prev) => !prev);
  };

  // Next / Previous
  const handleNext = () => {
    soundManager.playPop();
    if (currentIndex < currentDeck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompletedDeck(true);
      soundManager.playSuccessFanfare();
      onEarnStar?.();
    }
  };

  const handlePrev = () => {
    soundManager.playPop();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Assessment: "Got it" vs "Need practice"
  const handleAssess = async (isCorrect: boolean) => {
    if (!currentItem) return;

    if (isCorrect) {
      soundManager.playChime();
      setMasteredCount((prev) => prev + 1);
    } else {
      soundManager.playError();
    }

    // Persist to Neon DB
    try {
      await updateWordMasteryAction({
        vocabularyItemId: currentItem.id,
        isCorrect,
      });
    } catch {
      // Offline fallback
    }

    // Advance to next
    handleNext();
  };

  if (!currentItem) {
    return (
      <div className="text-center py-12 text-slate-500">
        No vocabulary cards available for this unit yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full px-4 py-6">
      {/* Deck Selector Header */}
      <div className="w-full flex items-center justify-between mb-4 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={activeDeck === "unit" ? "default" : "outline"}
            className={activeDeck === "unit" ? "bg-pink-600 text-white hover:bg-pink-700" : ""}
            onClick={handleSelectUnitDeck}
          >
            Unit Deck ({items.length})
          </Button>

          <Button
            size="sm"
            variant={activeDeck === "smartReview" ? "default" : "outline"}
            className={
              activeDeck === "smartReview"
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "border-purple-300 text-purple-700 hover:bg-purple-50"
            }
            onClick={handleSelectSmartReview}
            disabled={loadingSmartReview}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-400" />
            Daily Smart Review
          </Button>
        </div>

        {/* Listen Mode Toggle */}
        <Button
          size="sm"
          variant="ghost"
          className="text-xs text-slate-600 hover:text-slate-900 border border-slate-200"
          onClick={() => setIsListenMode(!isListenMode)}
        >
          {isListenMode ? (
            <>
              <Eye className="w-3.5 h-3.5 mr-1 text-pink-500" />
              Standard Mode
            </>
          ) : (
            <>
              <Headphones className="w-3.5 h-3.5 mr-1 text-indigo-500" />
              Listen & Guess
            </>
          )}
        </Button>
      </div>

      {/* Progress Track */}
      <div className="w-full mb-4">
        <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
          <span>
            Card {currentIndex + 1} of {currentDeck.length}
          </span>
          <span className="text-emerald-600 font-bold">{masteredCount} Mastered ⭐</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / currentDeck.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Completion View */}
      {completedDeck ? (
        <Card className="w-full p-8 text-center bg-white shadow-xl rounded-3xl border-2 border-emerald-300 animate-pop-in">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <Award className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Deck Completed! 🎉</h3>
          <p className="text-slate-600 mb-6">
            You practiced all {currentDeck.length} words in this session! You earned 1 Star!
          </p>
          <div className="flex justify-center gap-3">
            <Button
              className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6"
              onClick={() => {
                setCurrentIndex(0);
                setCompletedDeck(false);
                setMasteredCount(0);
                setIsFlipped(false);
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Practice Again
            </Button>
          </div>
        </Card>
      ) : (
        /* The 3D Interactive Flashcard */
        <div className="w-full perspective-1000">
          <div
            className={`relative w-full h-[380px] transition-transform duration-500 transform-style-3d cursor-pointer select-none ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={handleFlipCard}
          >
            {/* FRONT OF CARD */}
            <Card className="absolute inset-0 w-full h-full backface-hidden bg-white/95 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between border-2 border-pink-200/80 shadow-xl hover:shadow-2xl transition-shadow">
              {/* Card Top */}
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="text-xs uppercase font-bold text-pink-600 border-pink-200">
                  {currentItem.category || unitTitle}
                </Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:bg-pink-50 text-pink-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    playWordAudio(currentItem);
                  }}
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-6 h-6" />
                </Button>
              </div>

              {/* Card Center */}
              <div className="flex-1 flex flex-col items-center justify-center py-2">
                {isListenMode ? (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3 animate-pulse">
                      <Headphones className="w-12 h-12" />
                    </div>
                    <span className="text-sm font-semibold text-slate-500">Listen carefully...</span>
                    <span className="text-xs text-slate-400 mt-1">Tap card to see the word!</span>
                  </div>
                ) : (
                  <>
                    <div className="w-32 h-32 md:w-36 md:h-36 flex items-center justify-center mb-3">
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
                        <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-bold text-lg">
                          {currentItem.displayName}
                        </div>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-wide">
                      {currentItem.displayName}
                    </h2>
                    <span className="text-sm font-semibold text-pink-600 tracking-wider mt-1">
                      {currentItem.phonics}
                    </span>
                  </>
                )}
              </div>

              {/* Card Bottom Hint */}
              <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                <RotateCw className="w-3 h-3 text-slate-400 animate-spin-slow" />
                <span>Tap card to see example sentence & flip</span>
              </div>
            </Card>

            {/* BACK OF CARD */}
            <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 flex flex-col justify-between border-2 border-purple-300 shadow-xl">
              <div className="flex justify-between items-center">
                <Badge className="bg-purple-600 text-white text-xs">
                  {currentItem.partOfSpeech || "Word Meaning"}
                </Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:bg-purple-100 text-purple-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.speak(currentItem.exampleSentence);
                  }}
                >
                  <Volume2 className="w-6 h-6" />
                </Button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <h3 className="text-2xl font-black text-slate-800 mb-1">{currentItem.displayName}</h3>
                <p className="text-xs text-purple-700 font-bold mb-4">{currentItem.phonics}</p>

                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-purple-200/80 w-full mb-3 shadow-xs">
                  <p className="text-sm text-slate-700 italic font-medium leading-relaxed">
                    &ldquo;{currentItem.exampleSentence}&rdquo;
                  </p>
                </div>

                {currentItem.bookSource && (
                  <span className="text-xs font-semibold text-slate-500">
                    📖 Cambridge Source: {currentItem.bookSource}
                  </span>
                )}
              </div>

              {/* Assessment Controls */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="outline"
                  className="border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 font-bold rounded-2xl text-xs py-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAssess(false);
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-1 text-amber-600" />
                  Need Practice
                </Button>

                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs py-5 shadow-md shadow-emerald-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAssess(true);
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Got It! ⭐
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* External Prev / Next Navigation Controls */}
      {!completedDeck && (
        <div className="flex items-center justify-between w-full mt-6 px-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-4 border-slate-300"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-pink-600 hover:bg-pink-50 font-bold"
            onClick={handleFlipCard}
          >
            <RotateCw className="w-4 h-4 mr-1.5" />
            Flip Card
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-4 border-slate-300"
            onClick={handleNext}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};
