import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    timestamp: Date.now(),
  });
}

export const revalidate = 0;
