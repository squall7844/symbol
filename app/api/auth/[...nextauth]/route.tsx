import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials ?? {};
        if (username === "test" && password === "password") {
          return { id: "1", name: "Test User", email: "test@example.com" };
        }
        return null; // 認証失敗
      },
    }),
  ],
  pages: {
    signIn: "/login", // ログインページ
  },
  session: {
    strategy: "jwt", // JWTでセッションを管理
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // 認証成功後のリダイレクト先を指定
      return url.startsWith(baseUrl) ? url : `${baseUrl}/test`;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
