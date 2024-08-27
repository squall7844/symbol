import { NextResponse } from "next/server";
import axios from "axios";

//ビットバンクAPIから通貨の金額を取得
export const GET = async () => {
  try {
    const response = await axios.get(
      `${process.env.BITBANK_API_URL}/${process.env.BITBANK_API_PAIR}/ticker`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "仮想通貨の取得に失敗しました。" },
      { status: 500 }
    );
  }
};
