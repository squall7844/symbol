"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Chart from "@/components/Chart/ViewChart";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ThemeSwitch } from "@/components/Theme/ThmeSwitch";

const Price = () => {
  const { theme } = useTheme();
  const [priceData, setPriceData] = useState<any>();
  const [mosaics, setMosaics] = useState(null);
  const [DbData, setDbData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchPriceData = () => {
    // 仮想通貨(XYM)の最新価格を取得
    axios.get("/api/GetPrice").then((response) => {
      setPriceData(response.data);
    });
    // 現在のモザイク数を取得
    axios.get("/api/GetMosaic").then((response) => {
      setMosaics(response.data);
    });
    // DB情報を取得
    axios.get("/api/GetDB").then((response) => {
      setDbData(response.data);
    });
  };
  // データをリロード時に取得する
  useEffect(() => {
    fetchPriceData();
  }, []);

  // 定数を定義
  const Xym: any = priceData && priceData.data ? priceData.data.last : 0; //XYMの金額
  const My_Xym: number = Number(mosaics); // モザイク数を見やすい数字に修正
  const investment: number = 100000; //投資金額
  const test: string = DbData;
  const assets: number = Math.round(Xym * My_Xym); //資産金額
  const profit: number = Math.round(Xym * My_Xym - investment); //利益
  const result: string = profit > 0 ? "😊" : "😔";

  // map関数用配列
  const List = [
    { title: "XYM現在の金額", value: Xym },
    { title: "利益", value: profit + "円 " + result },
    { title: "投資金額", value: investment / 10000 + "万円" },
    { title: "モザイク数", value: My_Xym },
    { title: "ハーベスト数", value: 23 + "回" },
    { title: "harvest記録", value: "19から開始" },
  ];

  return (
    // <div className={theme === "dark" ? "neon-mode" : ""}>
    <div>
      <div className="flex text-left text-3xl font-serif p-5">
        <Image
          src="/symbol.webp"
          alt="XYM"
          width={48}
          height={48}
          className="animate-pulse mr-5"
        />
        XYMBOL 残高確認アプリ
      </div>
      <ThemeSwitch />
      {priceData && mosaics ? (
        <div>
          <div
            className={`flex w-10/12 text-5xl p-4 m-5 ${
              theme === "dark" ? "neon-border-blue" : "light-border"
            }`}
          >
            資産金額 : {assets}円
          </div>
          <div className="flex">
            <ul
              className={`lg:w-4/12 w-10/12 p-4 m-5 ${
                theme === "dark" ? "neon-border-blue" : "light-border"
              }`}
            >
              {List.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.5 }}
                  className={`border-b-2 text-3xl w-auto p-2 m-5 ${
                    theme === "dark" ? "border-white" : "border-black"
                  }`}
                >
                  {item.title} : {item.value}
                </motion.li>
              ))}
              <button
                onClick={() => {
                  setLoading(true);
                  fetchPriceData();
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                }}
              >
                <div>{test}</div>
                {loading ? (
                  <Image
                    src="/loading.svg"
                    alt="loading..."
                    width={64}
                    height={64}
                  />
                ) : (
                  <Image
                    src="/reload.svg"
                    alt="reload..."
                    width={64}
                    height={64}
                  />
                )}
              </button>
            </ul>

            <div
              className={`hidden lg:block w-6/12 p-4 m-5 ${
                theme === "dark" ? "neon-border-blue" : "light-border"
              }`}
            >
              <Chart />
            </div>
          </div>
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
