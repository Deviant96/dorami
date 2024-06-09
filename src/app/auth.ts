import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "@/db/user";
import { authConfig } from "@/app/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/db/prisma";
import credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials.username || !credentials.password) {
          throw new Error("Please enter username and password");
        }

        const user = await getUser(credentials.username as string);
        if (!user) {
          throw new Error(JSON.stringify({ errors: "errors", status: false }));
        }
        // const passwordMatch = await compare(credentials.password as string, user?.password! as string)

        // if (!passwordMatch) throw new Error('incorrect pass')
        // const user = await prisma.user.findUnique({
        //   where: {
        //     username: credentials.username as string
        //   }
        // })

        return user as any;
      },
    }),
  ],
});
