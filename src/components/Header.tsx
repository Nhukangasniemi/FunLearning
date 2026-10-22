"use client";

import React, { useState } from "react";
import { soundManager } from "@/lib/audio";
import { Star, Volume2, VolumeX, Sparkles, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  stars: number;
  dressColor: "pink" | "purple";
  onToggleDress: () => void;
  isPro?: boolean;
  onOpenProModal: () => void;
  userEmail?: string | null;
  onLoginDemo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stars,
  dressColor,
  onToggleDress,
  isPro = false,
  onOpenProModal,
  userEmail,
  onLoginDemo,
}) => {
  const [soundOn, setSoundOn] = useState(true);

  const handleToggleSound = () => {
    const newState = soundManager.toggleSound();
    setSoundOn(newState);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="text-3xl select-none animate-bounce-gentle">🍓</span>
          <div>
            <h1 className="text-lg sm:text-xl font-black bg-linear-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Lily&apos;s Yummy English!
            </h1>
            <p className="text-[11px] font-semibold text-slate-500 tracking-wide">
              Cambridge Starters Food Learning
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Star Counter Pill */}
          <Badge
            variant="amber"
            className="px-3 py-1.5 text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-xs"
            title="Gold Stars earned!"
          >
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{stars}</span>
          </Badge>

          {/* Dress Switcher Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onToggleDress();
              soundManager.playPop();
            }}
            className="hidden sm:inline-flex"
            title="Change Lily's Dress Color"
          >
            <span>👗</span>
            <span>{dressColor === "pink" ? "Pink 🌸" : "Purple 💜"}</span>
          </Button>

          {/* Sound & Speech Toggle */}
          <Button
            variant={soundOn ? "outline" : "secondary"}
            size="sm"
            onClick={handleToggleSound}
            className={soundOn ? "border-emerald-200 text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100" : ""}
            title="Turn sound on or off"
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline">{soundOn ? "Sound ON" : "Muted"}</span>
          </Button>

          {/* Pro / Stripe Subscription */}
          <Button
            variant={isPro ? "amber" : "pro"}
            size="sm"
            onClick={onOpenProModal}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isPro ? "PRO Active ⭐" : "Upgrade Pro"}</span>
          </Button>

          {/* Parent Account / Auth.js */}
          {userEmail ? (
            <Badge variant="outline" className="hidden lg:flex items-center gap-1 py-1 px-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="truncate max-w-25">{userEmail}</span>
            </Badge>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onLoginDemo}
              className="text-slate-600 hover:text-slate-900"
              title="Parent / Teacher Login"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Parent Login</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
