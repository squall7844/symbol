"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useMosaics } from "./Mosaic";
import Chart from "./ViewChart";

const Price = () => {
  const [priceData, setPriceData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const mosaics = useMosaics();

  // 仮想通貨の最新価格を取得
  const fetchPriceData = () => {
    axios.get("/api/GetPrice").then((response) => {
      setPriceData(response.data);
    });
  };
  // データをリロード時に取得する
  useEffect(() => {
    fetchPriceData();
  }, []);

  // モザイクの合計金額を取得
  const totalMosaicValue = mosaics.reduce(
    (acc, mosaic) => acc + parseInt(mosaic.amount.toString()),
    0
  );

  // 定数を定義
  const Xym: any = priceData && priceData.data ? priceData.data.last : 0; //XYMの金額
  const My_Xym: number = Math.round(totalMosaicValue / 1000000); // モザイク数を見やすい数字に修正
  const assets: number = Math.round(Xym * My_Xym); //資産金額
  const investment: number = 100000; //投資金額
  const profit: number = Math.round(Xym * My_Xym - investment); //利益
  const result: string = profit > 0 ? "😊" : "😔";

  // map関数用配列
  const List = [
    { title: "XYM現在の金額", value: Xym },
    { title: "利益", value: profit + "円 " + result },
    { title: "投資金額", value: investment / 10000 + "万円" },
    { title: "モザイク数", value: My_Xym },
    { title: "ハーベスト数", value: 21 + "回" },
  ];

  return (
    <div>
      {priceData ? (
        <div>
          <div className="neon-border-blue flex text-5xl p-4 m-5">
            資産金額 : {assets}円
          </div>
          <div className="flex">
            <ul className="neon-border-blue p-4 m-5">
              {List.map((item) => (
                <li
                  key={item.title}
                  className="border-b-2 border-white text-3xl w-auto p-2"
                >
                  {item.title} : {item.value}
                </li>
              ))}
            </ul>
            <div>ここにchartを表示するロジックを作成予定です。</div>
            <Chart />
          </div>

          <button
            onClick={() => {
              setLoading(true);
              fetchPriceData();
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }}
          >
            {loading ? (
              <Image
                src="/loading.svg"
                alt="loading..."
                width={32}
                height={32}
              />
            ) : (
              <Image src="/reload.svg" alt="reload..." width={32} height={32} />
            )}
          </button>
        </div>
      ) : (
        <div className="flex justify-center text-2xl">
          <Image
            src="/loading.svg"
            alt="loading..."
            width={32}
            height={32}
            className="mr-3"
          />
          Loading...
        </div>
      )}
    </div>
  );
};

export default Price;
