import { NextResponse } from "next/server";
import axios from "axios";

const PAIR = process.env.BITBANK_PAIR || "";
const URL = process.env.BITBANK_PUBLIC_URL || "";

// ビットバンクのAPIから1週間足のチャートデータを取得
export const GET = async () => {
  try {
    const response = await axios.get(`${URL}/${PAIR}/candlestick/1day/2024`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Chartの取得に失敗しました。" },
      { status: 500 }
    );
  }
};
