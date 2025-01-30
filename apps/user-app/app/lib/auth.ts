import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { LoginSchema } from "@repo/common/zodValidation";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@repo/db/client";
import { getUserById } from "@data/user";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import {
  Session as NextAuthSession,
  User as NextAuthUser,
  AuthOptions,
} from "next-auth";
import { getUserByEmail } from "@data/user";
import { getTwoFactorConfirmationById } from "@data/two-factor-confirmation";

interface Credentials {
  name?: string;
  email?: string;
  password: string;
  id?: string;
  phonenumber?: string;
  emailVerified?: Date;
  image?: string;
  isTwoFactorEnables: boolean;
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.WALLET_GITHUB_ID || "",
      clientSecret: process.env.WALLET_GITHUB_SECRET || "",
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize function called");
        if (!credentials) {
          return null;
        }
        // Zod validation
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          // If user login with gooogle provider then he doesnot have password
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  // @ts-ignore
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },

  secret: process.env.NEXTAUTH_SECRET || "secret",

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },

  callbacks: {
    async signIn({user, account}) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent signin Without email verification
      if (!existingUser?.emailVerified) return false;

      // 2fa 
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationById(existingUser.id);

        console.log("Two factor confirmation", {twoFactorConfirmation});

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next signin
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id
          }
        })

      }
 
      return true
    },
    async session({
      token,
      session,
    }: {
      token: JWT;
      session: NextAuthSession;
    }) {
      const newSession = session;
      console.log("sessionToken: ", token, session);

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (newSession.user && token.sub) {
        newSession.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token, user }) {
      const newToken: JWT = token as JWT;
      newToken.customField = "test";

      if (!newToken.sub) return newToken;

      const existingUser = await getUserById(newToken.sub);
      if (!existingUser) return newToken;
      newToken.role = existingUser.role;

      console.log("token: ", newToken);

      if (user) {
        newToken.id = user.id;
      }

      return newToken;
    },
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },
  },
  events: {
    async linkAccount({user}) {
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date() }
      })
    }
  }
};
