import { NextRequest, NextResponse } from "next/server";
import { Address, RepositoryFactoryHttp, Mosaic } from "symbol-sdk";

//アカウントの情報を取得しモザイクを取得する
export const GET = async (request: NextRequest) => {
  try {
    const address = process.env.NEXT_PUBLIC_ADDRESS || ""; //公開アドレス
    const accountAddress = Address.createFromRawAddress(address);
    const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL || "";
    const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
    const accountHttp = repositoryFactory.createAccountRepository();

    const accountInfo = await accountHttp
      .getAccountInfo(accountAddress)
      .toPromise();
    console.log(accountInfo.mosaics);
    return NextResponse.json(accountInfo.mosaics);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};
