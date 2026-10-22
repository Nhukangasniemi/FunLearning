import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    Credentials({
      name: "Parent / Teacher Account",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "parent@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const email = String(credentials.email).toLowerCase();
        
        try {
          const user = await prisma.user.findUnique({ where: { email } });
          if (user) {
            return user;
          }
          // Auto-create user for frictionless onboarding if database is running
          const newUser = await prisma.user.create({
            data: {
              email,
              name: email.split("@")[0],
              isPro: false,
            },
          });
          return newUser;
        } catch {
          // Fallback guest/dev account when offline
          return {
            id: "guest-user",
            name: email.split("@")[0],
            email,
            isPro: true,
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isPro = (user as unknown as { isPro?: boolean }).isPro ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        (session.user as unknown as { isPro: boolean }).isPro = Boolean(token.isPro);
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || "fallback-secret-for-development-mode-authjs",
});

