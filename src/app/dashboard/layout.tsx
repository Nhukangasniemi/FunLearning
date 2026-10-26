import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cambridge English Hub - Lily's English Quest",
  description:
    "Choose your Cambridge Young Learners English level: Pre-A1 Starters, A1 Movers, and A2 Flyers.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-berry-surface text-berry-on-surface">
      {children}
    </div>
  );
}

