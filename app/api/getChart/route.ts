import { NextResponse } from "next/server";
import { ROUTES } from "@/components/Utility/URL";
import axios from "axios";

const PAIR = process.env.BITBANK_PAIR || "";
const URL = ROUTES.BITBANK.PUBLIC;
const Year = new Date().getFullYear();

// ビットバンクのAPIから1週間足のチャートデータを取得
export const GET = async () => {
  try {
    const response = await axios.get(`${URL}/${PAIR}/candlestick/1day/${Year}`);

    const nextResponse = NextResponse.json(response.data);

    return nextResponse;
  } catch {
    return NextResponse.json(
      { error: "Chartの取得に失敗しました。" },
      { status: 500 }
    );
  }
};
