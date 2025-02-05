import axios from "axios";
import { NextResponse } from "next/server";
import { ROUTES } from "@/components/Utility/URL";

const PAIR = process.env.BITBANK_PAIR || "";
const URL = ROUTES.BITBANK.PUBLIC;

// ビットバンクAPIから通貨の金額を取得
export const GET = async () => {
  try {
    if (!PAIR || !URL) {
      throw new Error("Environment variables are not set properly");
    }

    // ビットバンクAPIからデータ取得
    console.log("Fetching URL:", `${URL}/${PAIR}/ticker`);
    const response = await axios.get(`${URL}/${PAIR}/ticker`);

    const price = response.data.data.last;

    // キャッシュ無効化ヘッダー付きでレスポンス
    const nextResponse = NextResponse.json({ price });

    return nextResponse;
  } catch (error) {
    console.error("Error fetching cryptocurrency price:", error);

    return NextResponse.json({ error: "仮想通貨の取得に失敗しました。" });
  }
};

export const revalidate = 0;
