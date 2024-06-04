import NextAuth from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

// https://stackoverflow.com/questions/74785412/nextauth-type-error-property-accesstoken-does-not-exist-on-type-session
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    userData: User;
    id: string;
    username?: string
    email?: string
  }

  interface User {
    id: number
    username?: string
    email?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string
    email: string
  }

  export interface JWT extends Record<string, unknown> {
    id_token?: string;
    provider?: string;
    accessToken?: string;
  }
}
