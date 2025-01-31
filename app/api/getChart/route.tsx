import { NextResponse } from "next/server";
import axios from "axios";

const PAIR = process.env.BITBANK_PAIR || "";
const URL = process.env.BITBANK_PUBLIC_URL || "";
const Year = new Date().getFullYear();

// ビットバンクのAPIから1週間足のチャートデータを取得
export const GET = async () => {
  try {
    const response = await axios.get(`${URL}/${PAIR}/candlestick/1day/${Year}`);

    const nextResponse = NextResponse.json(response.data);

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { error: "Chartの取得に失敗しました。" },
      { status: 500 }
    );
  }
};

export const revalidate = 0;
