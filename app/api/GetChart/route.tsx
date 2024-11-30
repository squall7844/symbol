import { NextResponse } from "next/server";
import axios from "axios";

const PAIR = process.env.BITBANK_PAIR || "";
const URL = process.env.BITBANK_PUBLIC_URL || "";

// ビットバンクのAPIから1週間足のチャートデータを取得
export const GET = async () => {
  try {
    const response = await axios.get(`${URL}/${PAIR}/candlestick/1day/2024`, {
      headers: {
        "Cache-Control": "no-store",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    });

    const nextResponse = NextResponse.json(response.data);

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { error: "Chartの取得に失敗しました。" },
      { status: 500 }
    );
  }
};
