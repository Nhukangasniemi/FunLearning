import React from "react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getBooksAction } from "@/actions/curriculum";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { BookCard } from "@/components/dashboard/BookCard";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import NextLink from "next/link";
import { ArrowRight, Trophy, BookOpen, Volume2, Sparkles } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const booksRes = await getBooksAction();
  const books = booksRes.success && booksRes.data ? booksRes.data : [];

  // Calculate or retrieve user stars
  let stars = 140; // Default demo matching Stitch screenshot
  if (session?.user?.id) {
    try {
      const agg = await prisma.unitProgress.aggregate({
        where: { userId: session.user.id },
        _sum: { starsEarned: true },
      });
      if (agg._sum.starsEarned !== null && agg._sum.starsEarned !== undefined) {
        stars = agg._sum.starsEarned;
      }
    } catch {
      // Fallback to default
    }
  }

  const userName = session?.user?.name || "Leo Explorer";
  const userEmail = session?.user?.email || "lily@funlearning.io";
  const isPro = (session?.user as unknown as { isPro?: boolean })?.isPro ?? true;

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Bar with Book Selector Dropdown, Page Title, User Profile & Stats */}
      <DashboardHeader
        books={books}
        currentBookSlug="starters"
        userName={userName}
        userEmail={userEmail}
        isPro={isPro}
        stars={stars}
      />

      {/* Main Dashboard Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome / Character Hero Section */}
        <DashboardHero />

        {/* 3 Cambridge Books Section */}
        <section aria-labelledby="choose-book-heading" className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="choose-book-heading"
                  className="text-xl sm:text-2xl font-black text-berry-on-surface"
                >
                  Cambridge Books Library 📚
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-pink-100 text-berry-primary">
                  3 Levels
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-berry-on-surface-variant mt-1">
                Select a book to choose units, practice 3D flashcards, play spelling games, and take quizzes!
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto bg-white border border-pink-100 px-3 py-1.5 rounded-full shadow-xs text-xs font-bold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Full Curriculum Ready</span>
            </div>
          </div>

          {/* 3 Interactive Book Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {books.slice(0, 3).map((book, idx) => (
              <BookCard key={book.id || book.slug} book={book} index={idx} />
            ))}
          </div>
        </section>

        {/* Daily Motivation & Quick Activity Tray (Matching Stitch Feature Banner) */}
        <section className="rounded-4xl bg-linear-to-r from-purple-50 via-pink-50 to-amber-50 border-2 border-pink-100/90 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-linear-to-tr from-berry-secondary to-berry-primary text-white flex items-center justify-center text-2xl shadow-md shrink-0">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h3 className="text-base sm:text-lg font-black text-berry-on-surface">
                  Daily Pronunciation & Quest Goal
                </h3>
                <span className="bg-amber-100 text-amber-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                  +15 Stars Today ⭐
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-berry-on-surface-variant mt-0.5">
                Complete all units across Starters, Movers, and Flyers to unlock Cambridge certificates!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <NextLink
              href="/books/starters/units/unit-4-food"
              className="flex-1 md:flex-initial py-2.5 px-5 rounded-full bg-berry-primary hover:bg-berry-primary-container text-white text-xs sm:text-sm font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-98"
            >
              <span>Quick Flashcards 🔤</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NextLink>

            <NextLink
              href="/"
              className="flex-1 md:flex-initial py-2.5 px-5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <span>Play Lily Game 🍽️</span>
            </NextLink>
          </div>
        </section>
      </main>

      {/* Stitch Design System Footer */}
      <DashboardFooter />
    </div>
  );
}

