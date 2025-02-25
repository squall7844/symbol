import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Prismaクライアントのグローバルインスタンス
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

// メイン関数でDBの接続をする
const connectDB = async () => {
  try {
    await prisma.$connect();
  } catch {
    throw new Error("DB接続に失敗しました。");
  }
};

// GETでUSERテーブルの情報を取得
export const GET = async () => {
  try {
    await connectDB();
    const user = await prisma.user.findUnique({
      where: {
        id: 1,
      },
      select: {
        harvest: true,
        amount: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません。" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "DBの取得に失敗しました。" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

// PUTでUSERテーブルの情報をアップデート
export const PUT = async (req: Request) => {
  try {
    await connectDB();
    const { id, harvest, amount } = await req.json();

    if (!id || (harvest === undefined && amount === undefined)) {
      return NextResponse.json(
        { error: "無効なリクエストデータです。" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        ...(harvest !== undefined && { harvest }),
        ...(amount !== undefined && { amount }),
      },
    });

    return NextResponse.json(updatedUser);
  } catch {
    return NextResponse.json(
      { error: "ユーザー情報の更新に失敗しました。" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
