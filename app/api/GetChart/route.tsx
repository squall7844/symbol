import { NextResponse } from "next/server";
import axios from "axios";

const PAIR = process.env.BITBANK_PAIR || "";
const URL = process.env.BITBANK_PUBLIC_URL || "";

// ビットバンクのAPIから1週間足のチャートデータを取得
export const GET = async () => {
  try {
    const response = await axios.get(`${URL}/${PAIR}/candlestick/1day/2024`, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    // レスポンスにキャッシュ無効化ヘッダーを追加
    const nextResponse = NextResponse.json(response.data);
    nextResponse.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    nextResponse.headers.set("Pragma", "no-cache");
    nextResponse.headers.set("Expires", "0");

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { error: "Chartの取得に失敗しました。" },
      { status: 500 }
    );
  }
};
