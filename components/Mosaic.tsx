import { useState, useEffect, useCallback } from "react";
import { Address, RepositoryFactoryHttp, Mosaic } from "symbol-sdk";

//アカウントの情報を取得しモザイクを取得する
export const useMosaics = () => {
  const address = process.env.NEXT_PUBLIC_ADDRESS || ""; //公開アドレス
  const [mosaics, setMosaics] = useState<Mosaic[]>([]);

  const accountInfo = useCallback(() => {
    const accountAddress = Address.createFromRawAddress(address);
    const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL || "";
    const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
    const accountHttp = repositoryFactory.createAccountRepository();

    accountHttp.getAccountInfo(accountAddress).subscribe(
      (accountInfo) => {
        setMosaics(accountInfo.mosaics);
        // console.log(accountInfo);
      },
      (err) => console.error(err)
    );
  }, [address]);

  useEffect(() => {
    accountInfo();
  }, [accountInfo]);

  return mosaics;
};
