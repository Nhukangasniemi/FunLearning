import React from "react";

export function DashboardFooter() {
  return (
    <footer className="w-full border-t border-pink-100/80 bg-white/90 backdrop-blur-md py-4 px-4 sm:px-8 mt-12 text-center text-xs font-bold text-berry-on-surface-variant">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span>🍓</span>
          <span className="text-berry-primary font-extrabold">
            Lily&apos;s English Quest
          </span>
          <span>•</span>
          <span>Fun Cambridge English Practice</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <span>Keep learning and collecting stars!</span>
          <span className="text-amber-500">⭐</span>
        </div>
      </div>
    </footer>
  );
}

