import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  // 現在のタイムスタンプをクエリパラメータとして追加
  url.searchParams.set('_t', Date.now().toString());

  return NextResponse.json(
    {
      timestamp: Date.now(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    }
  );
}
