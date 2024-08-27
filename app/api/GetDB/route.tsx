import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// USERテーブルの情報を取得する

// インスタンス化
const prisma = new PrismaClient();

// メイン関数でDBの接続をする
const connectDB = async () => {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました。");
  }
};

// GETでUSERテーブルの情報をすべて取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await connectDB();
    const postId2 = await prisma.user.findUnique({
      where: {
        id: 2,
      },
      select: {
        xym_public_key: true,
      },
    });

    // Objectから値を定数にする
    const post = postId2?.xym_public_key;

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(
      { error: "DBの取得に失敗しました。" },
      { status: 500 }
    );
  } finally {
    await prisma?.$disconnect;
  }
};
