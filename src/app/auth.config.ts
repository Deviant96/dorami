import prisma from "@/db/prisma";
import { getUser } from "@/db/user";
import bcrypt from "bcrypt";
import type { NextAuthConfig } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import credentials from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      let isLoggedIn = !!auth?.user;
      let isOnJobTracker = nextUrl.pathname.startsWith("/job-tracker");
      let isOnManageStates = nextUrl.pathname.startsWith("/manage-states");

      if (isOnJobTracker || isOnManageStates) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.id = account.id_token;
        token.provider = account.provider;
        token.accessToken = account.access_token;
        token.user = user;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.userData = {
        id: token.sub,
        email: token.email,
        username: token.username,
      };
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;
