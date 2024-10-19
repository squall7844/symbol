import { NextResponse } from "next/server";
import axios from "axios";

const PAIR = process.env.BITBANK_PAIR || "";
const URL  = process.env.BITBANK_PUBLIC_URL || "";

//ビットバンクAPIから通貨の金額を取得
export const GET = async () => {
  try {
    const response = await axios.get(`${URL}/${PAIR}/ticker`);
    const price = response.data.data.last;
    return NextResponse.json({ price });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "仮想通貨の取得に失敗しました。" },
      { status: 500 }
    );
  }
};
