/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const request = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_CORE_URL}/Auth/Login`,
          {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log(data);

        if (res.ok && data) {
          return {
            id: data.id,
            email: data.email,
            token: data.token,
          };
        } else {
          throw Error(data.message);
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
