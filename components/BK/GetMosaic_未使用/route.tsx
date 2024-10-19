//apiで使用していたが、公開アドレスが急にレスポンスをかえさなくなったため使用しないこととする。

import { NextResponse } from "next/server";
import { Address, RepositoryFactoryHttp } from "symbol-sdk";

// アカウントの情報を取得しモザイクを取得する
export const GET = async () => {
  try {
    const address = process.env.NEXT_PUBLIC_ADDRESS || ""; // 公開アドレス
    const accountAddress = Address.createFromRawAddress(address);
    const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL || "";
    const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
    const accountHttp = repositoryFactory.createAccountRepository();

    const accountInfo = await accountHttp
      .getAccountInfo(accountAddress)
      .toPromise();

    // モザイクのamountだけを取得して四捨五入する
    const amounts = accountInfo.mosaics.map((mosaic) =>
      Math.round(mosaic.amount.compact() / 1000000)
    );

    // console.log(accountInfo); アカウント情報ログ出力
    return NextResponse.json(amounts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Mosaicの取得に失敗しました。" },
      { status: 500 }
    );
  }
};
