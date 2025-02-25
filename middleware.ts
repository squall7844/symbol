import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextRequest, NextResponse } from "next/server";

//protected配下の場合に適応される。
export const config = {
  matcher: ["/protected/:path*"],
};

const { auth } = NextAuth(authConfig);

const middleware = async (req: NextRequest) => {
  const session = await auth();

  if (session) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export default auth(middleware);
