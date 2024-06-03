import prisma from "@/db/prisma";
import { getUser } from "@/db/user";
import bcrypt from "bcrypt";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      // console.log('nextUrl', nextUrl)
      //   console.log("authorized");
      let isLoggedIn = !!auth?.user;
      //   console.log("auth", auth);
      //   console.log("isLoggedIn", isLoggedIn);
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
      console.log('new URL(url).origin', new URL(url).origin)
      return baseUrl;
    },
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token;
        token.provider = account.provider;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("sign in callback")
        return true;
    },
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;
