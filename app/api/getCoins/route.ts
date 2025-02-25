import { ROUTES } from "@/components/Utility/URL";
import axios from "axios";
import crypto from "crypto";
import { NextResponse } from "next/server";

//ビットバンクAPIをenvから取得
const API_URL = ROUTES.BITBANK.API;
const API_KEY = process.env.BITBANK_API_KEY || "";
const API_SECRET = process.env.BITBANK_API_SECRET || "";

//通貨の保有量を取得 ヘッダーをつけてAPI認証
export const GET = async () => {
  const path = "/v1/user/assets";
  const nonce = Date.now().toString();
  const message = nonce + path;
  const signature = crypto
    .createHmac("sha256", API_SECRET)
    .update(message)
    .digest("hex");

  try {
    const response = await axios.get(`${API_URL}${path}`, {
      headers: {
        "ACCESS-KEY": API_KEY,
        "ACCESS-NONCE": nonce,
        "ACCESS-SIGNATURE": signature,
      },
    });

    //取得したデータからXYMの保有量を抽出
    const assets = response.data?.data?.assets;
    const xymAmount = assets?.find(
      (asset: { asset: string }) => asset.asset === "xym"
    )?.onhand_amount;
    const jpyAmount = assets?.find(
      (asset: { asset: string }) => asset.asset === "jpy"
    )?.onhand_amount;

    return NextResponse.json({ xymAmount, jpyAmount });
  } catch {
    return NextResponse.json({
      error: "ビットバンクのAPI取得に失敗しました。",
    });
  }
};
