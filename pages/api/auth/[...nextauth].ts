import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { verifyPassword, hashPassword } from "@lib/auth/passwords";
import { Session } from "@lib/auth/session";
import prisma from "@lib/prisma";
import { redirect } from "next/dist/server/api-utils";
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/sign-in",
    // signOut: "/auth/logout",
    error: "/sign-in", // Error code passed in query string as ?error=
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "app-login",
      name: "App Login",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your super secure password",
        },
      },
      async authorize(credentials) {
        try {
          let maybeUser = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              email: true,
              password: true,
              name: true,
              role: true,
              onboarded: true,
              image: true,
            },
          });

          if (!maybeUser) {
            if (!credentials.password || !credentials.email) {
              throw new Error("Invalid Credentials");
            }

            // If user is not on whitelist here
            let whitelistJson = await prisma.whitelist.findMany({});
            let isAllowedToSignIn = JSON.stringify(whitelistJson).includes(
              credentials.email
            )
              ? "true"
              : "false";
            if (isAllowedToSignIn === "false") {
              throw new Error("Not on waitlist");
            }

            maybeUser = await prisma.user.create({
              data: {
                email: credentials.email,
                password: await hashPassword(credentials.password),
              },
              select: {
                id: true,
                email: true,
                password: true,
                name: true,
                role: true,
                onboarded: true,
                image: true,
              },
            });
          } else {
            const isValid = await verifyPassword(
              credentials.password,
              maybeUser.password
            );

            if (!isValid) {
              throw new Error("Invalid Credentials");
            }
          }

          return {
            id: maybeUser.id,
            email: maybeUser.email,
            name: maybeUser.name,
            role: maybeUser.role,
            onboarded: maybeUser.onboarded,
            image: maybeUser.image,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
    CredentialsProvider({
      id: "admin-login",
      name: "Administrator Login",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your super secure password",
        },
      },
      async authorize(credentials) {
        let maybeUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
            role: true,
            onboarded: true,
            image: true,
          },
        });

        if (!maybeUser) {
          throw new Error("Unauthorized.");
        }

        if (maybeUser?.role !== "admin") {
          throw new Error("Unauthorized.");
        }

        const isValid = await verifyPassword(
          credentials.password,
          maybeUser.password
        );

        if (!isValid) {
          throw new Error("Invalid Credentials");
        }

        return {
          id: maybeUser.id,
          email: maybeUser.email,
          name: maybeUser.name,
          role: maybeUser.role,
          onboarded: maybeUser.onboarded,
          image: maybeUser.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      let whitelistJson = await prisma.whitelist.findMany({});
      let isAllowedToSignIn = JSON.stringify(whitelistJson).includes(user.email)
        ? "true"
        : "false";
      if (isAllowedToSignIn === "true") {
        return true;
      } else {
        console.log("falsito");
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.onboarded = user.onboarded;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.id = token.id;
      session.role = token.role;
      session.name = token.name;
      session.onboarded = token.onboarded;
      session.image = token.image;
      return session;
    },
  },
});
