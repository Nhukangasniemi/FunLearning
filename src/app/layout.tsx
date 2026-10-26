import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lily's English Quest - Cambridge YLE Learning Playground",
  description:
    "Gamified Cambridge Young Learners English (Starters, Movers, Flyers) learning hub powered by Next.js 16, React 19, Neon, and Prisma 7.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍓</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="min-h-screen font-sans antialiased selection:bg-rose-500 selection:text-white bg-berry-surface text-berry-on-surface">
        {children}
      </body>
    </html>
  );
}
