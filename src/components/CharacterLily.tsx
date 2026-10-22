"use client";

import React, { useState, useEffect, useCallback } from "react";
import { soundManager } from "@/lib/audio";
import { Volume2, Sparkles, Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CharacterLilyProps {
  dressColor: "pink" | "purple";
  speechText: string;
  isChewing: boolean;
  onChewComplete?: () => void;
  onToggleDress?: () => void;
}

export const CharacterLily: React.FC<CharacterLilyProps> = ({
  dressColor,
  speechText,
  isChewing,
  onChewComplete,
  onToggleDress,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [particles, setParticles] = useState<{ id: number; emoji: string; left: number }[]>([]);
  const [emotion, setEmotion] = useState<"happy" | "eating" | "celebrating">("happy");

  // Blinking cycle
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isChewing) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 180);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isChewing]);

  // Particle spawner
  const spawnParticle = useCallback(() => {
    const emojis = ["💖", "✨", "⭐", "🌸", "😋"];
    const id = Date.now() + Math.random();
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const left = 30 + Math.random() * 40;

    setParticles((prev) => [...prev, { id, emoji, left }]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  }, []);

  // Handle chewing state
  useEffect(() => {
    if (isChewing) {
      setEmotion("eating");
      soundManager.playMunch();

      const particleInterval = setInterval(() => {
        spawnParticle();
      }, 300);

      const timer = setTimeout(() => {
        clearInterval(particleInterval);
        setEmotion("happy");
        if (onChewComplete) onChewComplete();
      }, 1800);

      return () => {
        clearInterval(particleInterval);
        clearTimeout(timer);
      };
    } else {
      setEmotion("happy");
    }
  }, [isChewing, onChewComplete, spawnParticle]);

  const handleSayHello = () => {
    soundManager.playChime();
    spawnParticle();
    const hellos = [
      `Hi! I'm Lily! I love wearing my ${dressColor} dress! What shall we eat today?`,
      `Hello friend! I'm ready to learn English! Let's choose some tasty food!`,
      `Yum yum! I love breakfast, lunch, dinner, and sweet desserts!`,
    ];
    const phrase = hellos[Math.floor(Math.random() * hellos.length)];
    soundManager.speak(phrase);
  };

  const handleReplaySpeech = () => {
    if (speechText) {
      soundManager.speak(speechText);
    }
  };

  // Color variables
  const isPink = dressColor === "pink";
  const dressMain = isPink ? "#FF69B4" : "#9C27B0";
  const dressDark = isPink ? "#E91E63" : "#7B1FA2";
  const dressLight = isPink ? "#F8BBD0" : "#E1BEE7";
  const ribbonColor = isPink ? "#FF4081" : "#AB47BC";
  const skinTone = "#FFDFC4";
  const blushColor = "#FF8A80";
  const hairColor = "#5D4037";
  const hairHighlight = "#8D6E63";

  return (
    <Card className="relative overflow-hidden border border-slate-200/90 bg-white/95 shadow-lg backdrop-blur-md">
      {/* Background Glow */}
      <div
        className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: dressMain }}
      />

      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl flex items-center gap-2 text-slate-800">
          <span>Meet Lily!</span>
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
        </CardTitle>

        {onToggleDress && (
          <Badge
            variant={isPink ? "destructive" : "default"}
            className="cursor-pointer hover:scale-105 active:scale-95 transition-all text-xs"
            onClick={onToggleDress}
          >
            {isPink ? "Pink Dress 🌸" : "Purple Dress 💜"}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        {/* Dynamic Speech Bubble */}
        <div
          onClick={handleReplaySpeech}
          className="w-full bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-3.5 mb-4 shadow-sm cursor-pointer hover:border-amber-400 hover:bg-amber-100/70 transition-all group relative"
          title="Tap to hear Lily speak again!"
        >
          <p className="text-sm font-semibold text-amber-950 leading-snug">
            &ldquo;{speechText}&rdquo;
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-bold text-amber-700 group-hover:text-amber-800">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Tap to listen again</span>
          </div>
        </div>

        {/* Character SVG Anchor and Floating Particles */}
        <div className="relative w-48 h-64 flex items-center justify-center">
          {particles.map((p) => (
            <div
              key={p.id}
              className="floating-particle text-2xl select-none"
              style={{ left: `${p.left}%`, bottom: "50%" }}
            >
              {p.emoji}
            </div>
          ))}

          <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-sm select-none">
            <defs>
              <radialGradient id="girlFaceGrad" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#FFF3E0" />
                <stop offset="80%" stopColor={skinTone} />
                <stop offset="100%" stopColor="#F5CBA7" />
              </radialGradient>
              <linearGradient id="girlDressGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={dressLight} />
                <stop offset="40%" stopColor={dressMain} />
                <stop offset="100%" stopColor={dressDark} />
              </linearGradient>
              <linearGradient id="girlSkirtGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={dressMain} />
                <stop offset="100%" stopColor={dressDark} />
              </linearGradient>
            </defs>

            {/* Left Pigtail */}
            <path d="M22 46 C12 50, 4 66, 12 80 C18 90, 26 82, 24 70 C24 62, 26 52, 22 46 Z" fill={hairColor} />
            <path d="M14 54 C10 66, 10 76, 16 82" stroke={hairHighlight} strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Right Pigtail */}
            <path d="M78 46 C88 50, 96 66, 88 80 C82 90, 74 82, 76 70 C76 62, 74 52, 78 46 Z" fill={hairColor} />
            <path d="M86 54 C90 66, 90 76, 84 82" stroke={hairHighlight} strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Ribbons */}
            <circle cx="23" cy="46" r="4.5" fill={ribbonColor} />
            <path d="M22 46 Q16 42 18 36 Q22 40 22 46 Z" fill={ribbonColor} />
            <path d="M22 46 Q16 50 18 56 Q22 52 22 46 Z" fill={ribbonColor} />

            <circle cx="77" cy="46" r="4.5" fill={ribbonColor} />
            <path d="M78 46 Q84 42 82 36 Q78 40 78 46 Z" fill={ribbonColor} />
            <path d="M78 46 Q84 50 82 56 Q78 52 78 46 Z" fill={ribbonColor} />

            {/* Legs & Shoes */}
            <rect x="40" y="106" width="6" height="15" rx="3" fill={skinTone} />
            <rect x="54" y="106" width="6" height="15" rx="3" fill={skinTone} />
            <rect x="39.5" y="114" width="7" height="6" rx="2" fill="#FFFFFF" />
            <rect x="53.5" y="114" width="7" height="6" rx="2" fill="#FFFFFF" />
            <ellipse cx="42" cy="122" rx="6.5" ry="3.5" fill={dressDark} />
            <ellipse cx="58" cy="122" rx="6.5" ry="3.5" fill={dressDark} />
            <circle cx="41" cy="121" r="1.5" fill={ribbonColor} />
            <circle cx="57" cy="121" r="1.5" fill={ribbonColor} />

            {/* Skirt */}
            <path
              d="M36 94 C32 104, 25 110, 24 112 C30 114, 40 113, 50 113 C60 113, 70 114, 76 112 C75 110, 68 104, 64 94 Z"
              fill="url(#girlSkirtGrad)"
              stroke={dressDark}
              strokeWidth="1.2"
            />
            <path
              d="M24 112 Q29 110 34 112 Q40 110 46 112 Q50 110 54 112 Q60 110 66 112 Q71 110 76 112"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Bodice */}
            <path d="M37 78 L35 96 L65 96 L63 78 Z" fill="url(#girlDressGrad)" stroke={dressDark} strokeWidth="1" />
            <rect x="34.5" y="92" width="31" height="4.5" rx="2" fill={ribbonColor} />
            <ellipse cx="50" cy="94" rx="3.5" ry="2.5" fill="#FFFFFF" />

            {/* Sleeves & Arms */}
            <ellipse cx="33" cy="80" rx="5.5" ry="4.5" fill={dressLight} stroke={dressDark} strokeWidth="1" />
            <ellipse cx="67" cy="80" rx="5.5" ry="4.5" fill={dressLight} stroke={dressDark} strokeWidth="1" />
            <path d="M31 82 C28 90, 27 96, 32 98" stroke={skinTone} strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <circle cx="33" cy="99" r="3" fill={skinTone} />
            <path d="M69 82 C72 90, 73 96, 68 98" stroke={skinTone} strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <circle cx="67" cy="99" r="3" fill={skinTone} />

            {/* Collar & Brooch */}
            <path d="M40 76 Q50 82 50 82 Q50 82 60 76" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M50 83 C49 81, 47 81, 47 83 C47 85, 50 87, 50 87 C50 87, 53 85, 53 83 C53 81, 51 81, 50 83 Z" fill="#FFEB3B" />

            {/* Neck & Head */}
            <rect x="46" y="70" width="8" height="8" rx="2" fill={skinTone} />
            <circle cx="50" cy="54" r="23" fill="url(#girlFaceGrad)" />

            {/* Cheeks */}
            <ellipse
              cx="35"
              cy="58"
              rx="4.5"
              ry="2.8"
              fill={blushColor}
              opacity="0.65"
              className={emotion === "eating" ? "character-cheek chewing" : "character-cheek"}
            />
            <ellipse
              cx="65"
              cy="58"
              rx="4.5"
              ry="2.8"
              fill={blushColor}
              opacity="0.65"
              className={emotion === "eating" ? "character-cheek chewing" : "character-cheek"}
            />

            {/* Left Eye */}
            <g>
              <ellipse
                cx="40"
                cy="50"
                rx="4.5"
                ry="5.5"
                fill="#FFFFFF"
                style={{ opacity: isBlinking || emotion === "eating" ? 0 : 1 }}
              />
              <ellipse
                cx="41"
                cy="50"
                rx="3.5"
                ry="4.5"
                fill="#3E2723"
                style={{ opacity: isBlinking || emotion === "eating" ? 0 : 1 }}
              />
              <circle
                cx="40"
                cy="48"
                r="1.5"
                fill="#FFFFFF"
                style={{ opacity: isBlinking || emotion === "eating" ? 0 : 1 }}
              />
              <path
                d="M36 51 Q40 56 44 51"
                stroke="#3E2723"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                style={{ opacity: isBlinking || emotion === "eating" ? 1 : 0 }}
              />
            </g>

            {/* Right Eye */}
            <g>
              <ellipse
                cx="60"
                cy="50"
                rx="4.5"
                ry="5.5"
                fill="#FFFFFF"
                style={{ opacity: isBlinking || emotion === "eating" ? 0 : 1 }}
              />
              <ellipse
                cx="59"
                cy="50"
                rx="3.5"
                ry="4.5"
                fill="#3E2723"
                style={{ opacity: isBlinking || emotion === "eating" ? 0 : 1 }}
              />
              <circle
                cx="58"
                cy="48"
                r="1.5"
                fill="#FFFFFF"
                style={{ opacity: isBlinking || emotion === "eating" ? 0 : 1 }}
              />
              <path
                d="M56 51 Q60 56 64 51"
                stroke="#3E2723"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                style={{ opacity: isBlinking || emotion === "eating" ? 1 : 0 }}
              />
            </g>

            {/* Eyebrows & Nose */}
            <path d="M36 43 Q40 40 44 43" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M56 43 Q60 40 64 43" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="50" cy="55" r="1" fill="#E0A97E" />

            {/* Mouth */}
            <path
              d={
                emotion === "eating"
                  ? "M44 60 Q50 69 56 60 Z"
                  : emotion === "celebrating"
                  ? "M42 59 Q50 71 58 59 Z"
                  : "M45 61 Q50 67 55 61"
              }
              stroke="#C2185B"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill={emotion === "eating" ? "#880E4F" : "#FF80AB"}
              className={emotion === "eating" ? "character-mouth chewing" : "character-mouth"}
            />

            {/* Hair Front & Headband */}
            <path d="M28 44 C34 32, 66 32, 72 44 C68 40, 58 45, 52 41 C46 45, 36 40, 28 44 Z" fill={hairColor} />
            <path d="M28 44 C27 28, 40 18, 50 18 C60 18, 73 28, 72 44 Z" fill={hairColor} />
            <path d="M30 36 Q50 30 70 36" stroke={ribbonColor} strokeWidth="2.8" strokeLinecap="round" fill="none" />
            <circle cx="64" cy="33" r="3.5" fill="#FFF176" />
            <circle cx="64" cy="33" r="1.5" fill="#FF8F00" />
          </svg>
        </div>

        {/* Interactive Say Hello Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleSayHello}
          className="mt-4 w-full flex items-center justify-center gap-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-800"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Wave & Say Hello! 👋</span>
        </Button>
      </CardContent>
    </Card>
  );
};
