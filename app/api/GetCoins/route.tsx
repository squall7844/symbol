import axios from "axios";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// ビットバンクAPIをenvから取得
const API_URL = process.env.BITBANK_API_URL || "";
const API_KEY = process.env.BITBANK_API_KEY || "";
const API_SECRET = process.env.BITBANK_API_SECRET || "";

// 通貨の保有量を取得　ヘッダーをつけてAPI認証
export const GET = async () => {
  // レスポンスヘッダーの設定を追加
  const response = NextResponse.next({
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
    },
  });

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
        "Cache-Control": "no-cache",
      },
    });

    // 取得したデータからXYMの保有量を抽出
    const assets = response.data?.data?.assets;
    const xymAmount = assets?.find(
      (asset: { asset: string }) => asset.asset === "xym"
    )?.onhand_amount;
    const jpyAmount = assets?.find(
      (asset: { asset: string }) => asset.asset === "jpy"
    )?.onhand_amount;

    return NextResponse.json(
      { xymAmount, jpyAmount },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "Surrogate-Control": "no-store",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "ビットバンクのAPI取得に失敗しました。" },
      {
        status: 500,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "Surrogate-Control": "no-store",
        },
      }
    );
  }
};
