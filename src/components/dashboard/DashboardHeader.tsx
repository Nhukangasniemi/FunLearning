"use client";

import React, { useState } from "react";
import Link from "next/navigation";
import NextLink from "next/link";
import { soundManager } from "@/lib/audio";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Star,
  Volume2,
  VolumeX,
  ChevronDown,
  Sparkles,
  BookOpen,
  User,
  Check,
} from "lucide-react";
import { BookType } from "@/types";

interface DashboardHeaderProps {
  books?: BookType[];
  currentBookSlug?: string;
  userName?: string;
  userEmail?: string;
  isPro?: boolean;
  stars?: number;
}

export function DashboardHeader({
  books = [],
  currentBookSlug = "starters",
  userName = "Leo Explorer",
  userEmail,
  isPro = false,
  stars = 140,
}: DashboardHeaderProps) {
  const [soundOn, setSoundOn] = useState(true);

  const handleToggleSound = () => {
    const newState = soundManager.toggleSound();
    setSoundOn(newState);
  };

  // Find selected book or default to Starters
  const currentBook =
    books.find((b) => b.slug.toLowerCase() === currentBookSlug.toLowerCase()) ||
    books[0] || {
      title: "Starters (Pre-A1)",
      slug: "starters",
      level: "Pre-A1",
    };

  return (
    <header className="sticky top-0 z-40 w-full bg-berry-surface/95 backdrop-blur-md border-b border-pink-100/70 shadow-[0_2px_16px_rgba(30,23,52,0.05)]">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Logo & Title */}
          <NextLink
            href="/dashboard"
            className="flex items-center gap-2.5 sm:gap-3 group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-pink-100 flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-105 transition-transform">
              🍓
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg text-berry-primary leading-tight tracking-tight">
                Lily&apos;s English Quest
              </span>
              <span className="text-[11px] font-bold text-berry-on-surface-variant tracking-wide">
                Cambridge YLE Playground
              </span>
            </div>
          </NextLink>

          {/* Book Switcher Dropdown (Center) */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="appearance-none bg-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-berry-on-surface font-bold text-xs sm:text-sm border border-pink-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus:outline-none cursor-pointer hover:bg-pink-50/60 transition-colors flex items-center gap-1.5 sm:gap-2 active:scale-98"
                >
                  <span className="text-amber-500">⭐</span>
                  <span className="max-w-[130px] sm:max-w-[180px] truncate">
                    {currentBook.title}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-64">
                <DropdownMenuLabel>Select Cambridge Book</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Pre-A1 Starters */}
                <DropdownMenuItem asChild>
                  <NextLink
                    href="/books/starters"
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">⭐</span>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-slate-800">
                          Starters (Pre-A1)
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Ages 6–8 • Food, Animals & Colors
                        </span>
                      </div>
                    </div>
                    {currentBookSlug === "starters" && (
                      <Check className="w-4 h-4 text-berry-primary" />
                    )}
                  </NextLink>
                </DropdownMenuItem>

                {/* A1 Movers */}
                <DropdownMenuItem asChild>
                  <NextLink
                    href="/books/movers"
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🎈</span>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-slate-800">
                          Movers (A1)
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Ages 8–10 • Daily Life & Quests
                        </span>
                      </div>
                    </div>
                    {currentBookSlug === "movers" && (
                      <Check className="w-4 h-4 text-berry-secondary" />
                    )}
                  </NextLink>
                </DropdownMenuItem>

                {/* A2 Flyers */}
                <DropdownMenuItem asChild>
                  <NextLink
                    href="/books/flyers"
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🚀</span>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-slate-800">
                          Flyers (A2)
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Ages 9–12 • World, Science & Stories
                        </span>
                      </div>
                    </div>
                    {currentBookSlug === "flyers" && (
                      <Check className="w-4 h-4 text-berry-tertiary" />
                    )}
                  </NextLink>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <NextLink
                    href="/dashboard"
                    className="font-bold text-berry-primary flex items-center gap-2 justify-center py-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>View All 3 Books Overview</span>
                  </NextLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Status (Stars, Sound, User Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stars Pill */}
            <div
              className="flex items-center gap-1.5 bg-white px-3 sm:px-3.5 py-1.5 rounded-full border border-pink-100 shadow-[0_2px_6px_rgba(0,0,0,0.04)] select-none"
              title="Stars Earned"
            >
              <span className="text-base leading-none">⭐</span>
              <span className="text-xs sm:text-sm font-extrabold text-berry-primary">
                {stars} Stars
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              className="w-9 h-9 rounded-full bg-white border border-pink-100 text-berry-primary flex items-center justify-center hover:bg-pink-50/70 transition-colors shadow-sm cursor-pointer"
              title={soundOn ? "Sound Effects ON" : "Sound Muted"}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 bg-pink-50/80 border border-pink-100 pl-1 pr-3 py-1 rounded-full shadow-xs">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-berry-secondary text-white flex items-center justify-center shadow-xs font-bold text-xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-berry-on-surface leading-tight">
                  {userName}
                </span>
                <span className="text-[10px] font-semibold text-purple-600">
                  {isPro ? "PRO Explorer ⭐" : "Junior Learner"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Pill Bar */}
        <nav className="flex items-center justify-center gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 pb-0.5 overflow-x-auto scrollbar-none">
          <NextLink
            href="/dashboard"
            className="px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all bg-berry-primary text-white shadow-[0_2px_8px_rgba(184,0,71,0.25)]"
          >
            📚 Choose Book
          </NextLink>

          <NextLink
            href="/"
            className="px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-berry-on-surface-variant hover:text-berry-on-surface hover:bg-white/80 whitespace-nowrap transition-all"
          >
            🍽️ Feed & Play
          </NextLink>

          <NextLink
            href="/books/starters/units/unit-4-food"
            className="px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-berry-on-surface-variant hover:text-berry-on-surface hover:bg-white/80 whitespace-nowrap transition-all"
          >
            🔤 Vocabularies
          </NextLink>

          <NextLink
            href="/books/starters"
            className="px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-berry-on-surface-variant hover:text-berry-on-surface hover:bg-white/80 whitespace-nowrap transition-all"
          >
            ✨ AI Story Studio
          </NextLink>
        </nav>
      </div>
    </header>
  );
}

