import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// USERテーブルの情報を取得する

// インスタンス化
const prisma = new PrismaClient();

// メイン関数でDBの接続をする
export async function GetDB() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました。");
  }
}

// GETでUSERテーブルの情報をすべて取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await GetDB();
    const allPosts = await prisma.user.findMany();
    return NextResponse.json({ message: "成功", allPosts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "失敗", err }, { status: 500 });
  } finally {
    await prisma?.$disconnect;
  }
};
