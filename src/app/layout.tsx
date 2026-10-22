import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lily's Yummy English Adventure! - Starters Practice",
  description:
    "Interactive Cambridge Young Learners English (Starters) food learning web application powered by Next.js 16, React 19, Neon, Prisma 7, and OpenAI.",
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
    <html lang="en">
      <body className="min-h-screen antialiased selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
