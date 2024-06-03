import NextAuth from "next-auth";

// https://stackoverflow.com/questions/74785412/nextauth-type-error-property-accesstoken-does-not-exist-on-type-session
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string;
    provider?: string;
    accessToken?: string;
  }
}
