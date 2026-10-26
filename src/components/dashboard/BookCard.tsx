"use client";

import React from "react";
import NextLink from "next/link";
import { BookType } from "@/types";
import { soundManager } from "@/lib/audio";
import { ArrowRight, BookOpen, Sparkles, Star, Award, CheckCircle2 } from "lucide-react";

interface BookCardProps {
  book: BookType;
  index: number;
}

// Preset visual themes per Cambridge level
const BOOK_THEMES: Record<
  string,
  {
    themeColor: string;
    primaryButtonBg: string;
    buttonHoverBg: string;
    buttonShadowColor: string;
    badgeBg: string;
    badgeText: string;
    mascotName: string;
    mascotEmoji: string;
    accentGradient: string;
    cardBorder: string;
    sampleTopics: string[];
    bgPatternColor: string;
  }
> = {
  starters: {
    themeColor: "#b80047",
    primaryButtonBg: "bg-berry-primary",
    buttonHoverBg: "hover:bg-berry-primary-container",
    buttonShadowColor: "#900036",
    badgeBg: "bg-rose-100",
    badgeText: "text-berry-primary",
    mascotName: "Lily Explorer",
    mascotEmoji: "🍓",
    accentGradient: "from-rose-500/15 via-pink-400/10 to-transparent",
    cardBorder: "hover:border-rose-300",
    sampleTopics: ["Food & Drink", "Cute Animals", "Colors & Numbers", "The Family"],
    bgPatternColor: "bg-rose-50",
  },
  movers: {
    themeColor: "#710fe5",
    primaryButtonBg: "bg-berry-secondary",
    buttonHoverBg: "hover:bg-berry-secondary-container",
    buttonShadowColor: "#5d00c2",
    badgeBg: "bg-purple-100",
    badgeText: "text-berry-secondary",
    mascotName: "Barnaby Bear",
    mascotEmoji: "🐻",
    accentGradient: "from-purple-500/15 via-violet-400/10 to-transparent",
    cardBorder: "hover:border-purple-300",
    sampleTopics: ["At the Farm", "The Big Zoo", "Party Time", "Daily Routines"],
    bgPatternColor: "bg-purple-50",
  },
  flyers: {
    themeColor: "#006947",
    primaryButtonBg: "bg-berry-tertiary",
    buttonHoverBg: "hover:bg-berry-tertiary-container",
    buttonShadowColor: "#004f34",
    badgeBg: "bg-emerald-100",
    badgeText: "text-berry-tertiary",
    mascotName: "Pip Bird",
    mascotEmoji: "🐦",
    accentGradient: "from-emerald-500/15 via-teal-400/10 to-transparent",
    cardBorder: "hover:border-emerald-300",
    sampleTopics: ["Around the World", "Space Discovery", "Sports & Hobbies", "Adventure Stories"],
    bgPatternColor: "bg-emerald-50",
  },
};

export function BookCard({ book, index }: BookCardProps) {
  const slugKey = book.slug.toLowerCase();
  const theme = BOOK_THEMES[slugKey] || BOOK_THEMES.starters;

  const unitCount = book.units?.length || 0;
  const wordsCount =
    book.totalWords !== undefined
      ? `${book.totalWords} Words`
      : `${unitCount * 5}+ Words`;

  return (
    <div
      className={`relative rounded-4xl bg-white border-2 border-slate-100 ${theme.cardBorder} shadow-[0_8px_24px_-4px_rgba(30,23,52,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(30,23,52,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group`}
    >
      {/* Top Ambient Glow / Header Banner */}
      <div className={`h-36 w-full bg-linear-to-br ${theme.accentGradient} p-5 relative overflow-hidden flex flex-col justify-between`}>
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/40 blur-xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/60 blur-lg pointer-events-none" />

        {/* Top Badges Row */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          {/* Level Badge */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText} shadow-xs flex items-center gap-1.5`}
          >
            <span>{theme.mascotEmoji}</span>
            <span>{book.level || `Level ${index + 1}`}</span>
          </span>

          {/* Age Recommendation */}
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-700 shadow-xs border border-white/60">
            {book.targetAge || "Ages 6-12"}
          </span>
        </div>

        {/* Mascot Tag */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-xl">
            {theme.mascotEmoji}
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 block leading-tight">
              Companion Mascot
            </span>
            <span className="text-sm font-extrabold text-berry-on-surface leading-tight">
              {theme.mascotName}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        {/* Title & Description */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {book.series || "Cambridge Young Learners"}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-berry-on-surface group-hover:text-berry-primary transition-colors leading-tight">
            {book.title}
          </h3>

          <p className="mt-2 text-sm text-berry-on-surface-variant leading-relaxed line-clamp-3">
            {book.description ||
              "Engaging curriculum-aligned English learning with interactive flashcards, pronunciation syllable drills, and Cambridge practice quizzes."}
          </p>
        </div>

        {/* Curriculum Topic Chips */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Curriculum Highlights
          </span>
          <div className="flex flex-wrap gap-1.5">
            {theme.sampleTopics.map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-100"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-50/80 rounded-2xl p-2.5 border border-slate-100/60">
            <span className="block text-base font-black text-berry-on-surface">
              {unitCount}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Units
            </span>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-2.5 border border-slate-100/60">
            <span className="block text-base font-black text-berry-on-surface">
              {wordsCount}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Vocabulary
            </span>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-2.5 border border-slate-100/60">
            <span className="block text-base font-black text-amber-500">
              YLE Test
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Quizzes
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col gap-2.5">
          <NextLink
            href={`/books/${book.slug}`}
            onClick={() => soundManager.playPop()}
            style={{
              boxShadow: `0 4px 0 ${theme.buttonShadowColor}`,
            }}
            className={`w-full py-3.5 px-6 rounded-full text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:translate-y-1 active:shadow-none cursor-pointer ${theme.primaryButtonBg} ${theme.buttonHoverBg}`}
          >
            <span>Start {book.title.split(":")[0]} Quest</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NextLink>

          <NextLink
            href={`/books/${book.slug}`}
            className="w-full py-2 px-4 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-center transition-colors"
          >
            Browse All {unitCount} Units ➔
          </NextLink>
        </div>
      </div>
    </div>
  );
}

