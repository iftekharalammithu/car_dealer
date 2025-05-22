import CredentialsProvider from "@auth/core/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import type { NextAuthConfig, User } from "next-auth";
import ResendProvider from "@auth/core/providers/resend";
import { bcryptPasswordCompare } from "@/lib/bcrypt";
import { SESSION_MAX_AGE } from "@/config/constants";
import { SignSchema } from "@/app/schemas/Signin.Schema";
import { routes } from "@/config/route";
import { issueChallange } from "@/lib/otp";
import { AdapterUser } from "next-auth/adapters";

export const config = {
  adapter: PrismaAdapter(prisma),
  useSecureCookies: false,
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET, // Add this line

  session: {
    strategy: "database",
    maxAge: SESSION_MAX_AGE / 1000,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const validatedField = SignSchema.safeParse(credentials);
          if (!validatedField.success) {
            return null;
          }
          const user = await prisma.user.findUnique({
            where: { email: validatedField.data.email },
            select: { id: true, email: true, hashedpassword: true },
          });

          if (!user) {
            return null;
          }
          const match = bcryptPasswordCompare(
            validatedField.data.password,
            user.hashedpassword
          );
          // console.log(match);
          if (!match) {
            return null;
          }
          // console.log(user);
          await issueChallange(user.id, user.email);

          return {
            ...user,
            requires2FA: true,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    ResendProvider({}),
  ],
  pages: {
    signIn: routes.signIn,
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ user, token }) {
      const session = await prisma.session.create({
        data: {
          expires: new Date(Date.now() + SESSION_MAX_AGE),
          sessionToken: crypto.randomUUID(),
          userId: user.id as string,
          requires2FA: user.requires2FA as boolean,
        },
      });
      if (!session) {
        return null;
      }
      if (user) {
        token.requires2FA = user.requires2FA;
      }
      token.id = session.sessionToken;
      token.exp = session.expires.getTime();
      return token;
    },
    async session({ session, user }) {
      // console.log(session);
      session.user = { id: session.userId, email: user.email } as AdapterUser;
      return session;
    },
  },
  jwt: {
    encode: async ({ token }) => token?.id as string,
  },
} as NextAuthConfig;
