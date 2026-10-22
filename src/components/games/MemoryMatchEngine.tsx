"use client";

import React, { useState, useEffect } from "react";
import { VocabularyItemType } from "@/types";
import { soundManager } from "@/lib/audio";
import { Award, RotateCcw, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MemoryMatchEngineProps {
  items: VocabularyItemType[];
  onEarnStar?: () => void;
}

interface MemoryCard {
  id: string; // unique card id
  pairId: string; // vocabulary item id
  type: "word" | "picture";
  item: VocabularyItemType;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryMatchEngine: React.FC<MemoryMatchEngineProps> = ({ items, onEarnStar }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MemoryCard[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [matchesCount, setMatchesCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize game board with 6 pairs
  const initGame = () => {
    if (!items || items.length === 0) return;

    // Pick 6 random or first 6 items
    const selectedItems = [...items].sort(() => Math.random() - 0.5).slice(0, 6);

    const cardList: MemoryCard[] = [];
    selectedItems.forEach((item) => {
      // 1 picture card
      cardList.push({
        id: `pic-${item.id}`,
        pairId: item.id,
        type: "picture",
        item,
        isFlipped: false,
        isMatched: false,
      });

      // 1 word card
      cardList.push({
        id: `word-${item.id}`,
        pairId: item.id,
        type: "word",
        item,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle all 12 cards
    const shuffled = cardList.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setIsChecking(false);
    setMatchesCount(0);
    setIsComplete(false);

    soundManager.speak("Find the matching pairs of pictures and words!");
  };

  useEffect(() => {
    initGame();
  }, [items]);

  const handleCardClick = (card: MemoryCard) => {
    if (isChecking || card.isFlipped || card.isMatched) return;

    soundManager.playPop();

    // Flip card
    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    // Speak word
    soundManager.speak(card.item.displayName);

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsChecking(true);
      const [first, second] = newSelected;

      if (first.pairId === second.pairId) {
        // MATCH!
        setTimeout(() => {
          soundManager.playChime();
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true } : c
            )
          );
          setSelectedCards([]);
          setIsChecking(false);
          const nextCount = matchesCount + 1;
          setMatchesCount(nextCount);

          if (nextCount === 6) {
            setIsComplete(true);
            soundManager.playSuccessFanfare();
            soundManager.speak("Hooray! You matched all pairs! You earned 1 Star!");
            onEarnStar?.();
          }
        }, 600);
      } else {
        // NO MATCH
        setTimeout(() => {
          soundManager.playError();
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelectedCards([]);
          setIsChecking(false);
        }, 1100);
      }
    }
  };

  if (!items || items.length === 0) {
    return <div className="text-center py-12 text-slate-500">No items available for memory match.</div>;
  }

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto w-full px-4 py-4">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <Badge variant="outline" className="text-xs font-bold text-indigo-700 border-indigo-200">
          Pairs Matched: {matchesCount} / 6 ⭐
        </Badge>

        <Button size="sm" variant="outline" className="text-xs" onClick={initGame}>
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          Shuffle Cards
        </Button>
      </div>

      {/* Completion View */}
      {isComplete ? (
        <Card className="w-full p-8 text-center bg-white shadow-xl rounded-3xl border-2 border-emerald-300 animate-pop-in my-6">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <Award className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-2">Memory Match Master! 🌟</h3>
          <p className="text-slate-600 mb-6">
            Fantastic job! You matched all 6 picture & word pairs!
          </p>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6"
            onClick={initGame}
          >
            Play Again
          </Button>
        </Card>
      ) : (
        /* The 3x4 / 4x3 Grid */
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 w-full">
          {cards.map((card) => {
            const showFace = card.isFlipped || card.isMatched;

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                disabled={card.isMatched || isChecking}
                className={`h-28 md:h-32 rounded-2xl flex flex-col items-center justify-center p-3 text-center transition-all duration-300 transform select-none ${
                  card.isMatched
                    ? "bg-emerald-50 border-2 border-emerald-400 opacity-80 scale-95 shadow-xs"
                    : showFace
                    ? "bg-white border-2 border-purple-400 shadow-md scale-100"
                    : "bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-indigo-400 shadow-sm hover:scale-102 hover:shadow-md cursor-pointer text-white"
                }`}
              >
                {showFace ? (
                  card.type === "picture" ? (
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                      {card.item.svg ? (
                        <div
                          className="w-full h-full drop-shadow-xs"
                          dangerouslySetInnerHTML={{ __html: card.item.svg }}
                        />
                      ) : card.item.imageUrl ? (
                        <img
                          src={card.item.imageUrl}
                          alt={card.item.displayName}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <span className="font-bold text-slate-700 text-sm">
                          {card.item.displayName}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-extrabold text-slate-800 text-base md:text-lg">
                        {card.item.displayName}
                      </span>
                      <span className="text-[11px] font-semibold text-purple-600 mt-1">
                        {card.item.phonics}
                      </span>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Sparkles className="w-8 h-8 text-amber-300 opacity-90 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wider mt-1 opacity-80 uppercase">
                      Tap
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
