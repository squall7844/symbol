import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(
    {
      timestamp: Date.now(),
    },
    {
      status: 200,
      headers: {
        // キャッシュを完全に無効化するヘッダーを追加
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        // Vercel特有のキャッシュコントロール
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    }
  );
}
