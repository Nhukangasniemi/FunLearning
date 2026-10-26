"use client";

import React from "react";
import { soundManager } from "@/lib/audio";
import { Sparkles, Trophy, Star, Volume2 } from "lucide-react";

export function DashboardHero() {
  const handleHearLily = () => {
    soundManager.speak(
      "Hi! Welcome to your Cambridge English learning dashboard! Choose any book below to start your adventure!"
    );
  };

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border-2 border-pink-100 shadow-[0_10px_30px_rgba(184,0,71,0.06)] p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10">
      {/* Soft Ambient Pastel Background Blurs */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Left Intro Text & Speech */}
        <div className="flex-1 text-center md:text-left">
          {/* Top Pill Tags */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/80 text-berry-primary font-extrabold text-xs mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cambridge Young Learners English (YLE)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-berry-on-surface leading-tight tracking-tight">
            Choose Your English Quest! 🎈
          </h2>

          <p className="mt-2.5 text-sm sm:text-base font-medium text-berry-on-surface-variant max-w-xl leading-relaxed">
            Welcome, explorer! Learn yummy foods, animals, colors, and daily life words with native syllable phonics drills, 3D flashcards, and Cambridge practice quizzes!
          </p>

          {/* Quick Stats Badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/70 text-xs font-bold text-slate-700">
              <span>⭐</span>
              <span>3 Cambridge Books</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/70 text-xs font-bold text-slate-700">
              <span>📚</span>
              <span>26 Units Roadmap</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/70 text-xs font-bold text-slate-700">
              <span>🗣️</span>
              <span>Native Audio & Phonics</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Audio Engine Ready</span>
            </div>
          </div>
        </div>

        {/* Right Mascot Lily Stage & Speech Card */}
        <div className="flex flex-col items-center shrink-0 w-full sm:w-80">
          <div className="relative mb-3">
            {/* Mascot Avatar Circle */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-linear-to-tr from-pink-200 via-purple-100 to-rose-200 p-1 shadow-lg flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-5xl sm:text-6xl shadow-inner select-none">
                👧🏽
              </div>
            </div>

            {/* Level Star Badge */}
            <div className="absolute -bottom-2 -left-2 bg-berry-secondary text-white px-2.5 py-0.5 rounded-full text-xs font-extrabold shadow-sm flex items-center gap-1">
              <span>⭐</span>
              <span>Level 1</span>
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="w-full bg-berry-surface-low border border-pink-100 rounded-2xl p-3.5 relative shadow-xs text-center">
            <p className="text-xs sm:text-sm font-semibold text-berry-on-surface leading-snug">
              &quot;Hi! I&apos;m Lily! Pick any book below to start practicing words and earning shiny gold stars!&quot;
            </p>
            <button
              type="button"
              onClick={handleHearLily}
              className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-berry-secondary text-xs font-bold border border-purple-100 hover:bg-purple-50 transition-colors shadow-xs cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Hear Lily 🔊</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

