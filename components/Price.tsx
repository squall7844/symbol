"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Chart from "./ViewChart";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ThemeSwitch } from "./Theme/ThmeSwitch";

const Price = () => {
  const { theme } = useTheme();
  const [priceData, setPriceData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [mosaics, setMosaics] = useState("");

  const fetchPriceData = () => {
    // 仮想通貨(XYM)の最新価格を取得
    axios.get("/api/GetPrice").then((response) => {
      setPriceData(response.data);
    });
    // 現在のモザイク数を取得
    axios.get("/api/GetMosaic").then((response) => {
      setMosaics(response.data);
    });
  };
  // データをリロード時に取得する
  useEffect(() => {
    fetchPriceData();
  }, []);

  // 定数を定義
  const Xym: any = priceData && priceData.data ? priceData.data.last : 0; //XYMの金額
  const My_Xym: number = Number(mosaics); // モザイク数を見やすい数字に修正
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
    <div className={theme === "dark" ? "neon-mode" : ""}>
      <ThemeSwitch />
      {priceData && mosaics ? (
        <div>
          <div
            className={`flex w-10/12 text-5xl p-4 m-5 ${
              theme === "dark" ? "neon-border-blue" : ""
            }`}
          >
            資産金額 : {assets}円
          </div>
          <div className="flex">
            <ul
              className={`w-4/12 p-4 m-5 ${
                theme === "dark" ? "neon-border-blue" : ""
              }`}
            >
              {List.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.5 }}
                  className="border-b-2 border-white text-3xl w-auto p-2 m-5"
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
              className={`w-6/12 p-4 m-5 ${
                theme === "dark" ? "neon-border-blue" : ""
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
