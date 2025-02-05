import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "@/auth.config";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  // adapter: PrismaAdapter(prisma), DB接続する際に使用するようになる。
  session: { strategy: "jwt" },
  ...authConfig,
});
