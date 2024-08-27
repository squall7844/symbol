import { NextResponse } from "next/server";
import axios from "axios";

// ビットバンクのAPIから1週間足のチャートデータを取得
export const GET = async () => {
  try {
    const response = await axios.get(
      `${process.env.BITBANK_API_URL}/${process.env.BITBANK_API_PAIR}/candlestick/1day/2024`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Chartの取得に失敗しました。" },
      { status: 500 }
    );
  }
};
