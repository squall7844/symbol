import { NextResponse } from "next/server";
import axios from "axios";

const PAIR = process.env.BITBANK_PAIR || "";
const URL = process.env.BITBANK_PUBLIC_URL || "";

// ビットバンクAPIから通貨の金額を取得
export const GET = async () => {
  try {
    // ビットバンクAPIからデータ取得
    const response = await axios.get(`${URL}/${PAIR}/ticker`, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    const price = response.data.data.last;

    // レスポンスヘッダーでキャッシュを無効化
    const nextResponse = NextResponse.json({ price });
    nextResponse.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    nextResponse.headers.set("Pragma", "no-cache");
    nextResponse.headers.set("Expires", "0");

    return nextResponse;
  } catch (error) {
    console.error("Error fetching cryptocurrency price:", error);
    return NextResponse.json(
      { error: "仮想通貨の取得に失敗しました。" },
      { status: 500 }
    );
  }
};
