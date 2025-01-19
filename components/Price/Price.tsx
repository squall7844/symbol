"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import axios from "axios";
import ResponsiveChart from "@/components/Chart/ResponsiveChart";
import Loding from "../Utility/Loding";

interface DBData {
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}

const Price = () => {
  const { theme } = useTheme();
  const [priceData, setPriceData] = useState(null);
  const [xymCoins, setXymCoins] = useState<number | null>(null);
  const [jpyCoins, setJpyCoins] = useState<number | null>(null);
  const [DbData, setDbData] = useState<DBData | null>(null);
  const [loading, setLoading] = useState(false);

  // 定数を定義
  const investment = DbData ? DbData.amount : 0;
  const xymPrice = Number(priceData); //XYMの金額
  const xymAmount = Math.round(Number(xymCoins)); //XYMの保有量
  const jpyAmount = Math.round(Number(jpyCoins)); //JPYの保有量
  const assets = Math.round(xymPrice * xymAmount) + jpyAmount; //資産金額
  const profit = Math.round(assets - investment); //利益
  const result = profit > 0 ? "😊" : "😔";

  const fetchPriceData = async () => {
    try {
      // 仮想通貨(XYM)の最新価格を取得
      const priceResponse = await axios.get("/api/GetPrice");
      setPriceData(priceResponse.data.price);

      // 現在のモザイク数を取得
      const coinsResponse = await axios.get("/api/GetCoins");
      setXymCoins(coinsResponse.data.xymAmount);
      setJpyCoins(coinsResponse.data.jpyAmount);

      // DB情報を取得
      const dbResponse = await axios.get("/api/GetDB");
      setDbData(dbResponse.data);

      //エラー処理
    } catch (error) {
      console.error("データ取得に失敗しました。:", error);
    }
  };
  // データをリロード時に取得する
  useEffect(() => {
    fetchPriceData();
  }, []);

  // map関数用配列
  const List = [
    { title: "現在価格(XYM)", value: xymPrice + "円" },
    { title: "XYM保有量", value: xymAmount + "枚" },
    { title: "JPY保有量", value: jpyAmount + "円" },
    { title: "利益", value: profit + "円 " + result },
    { title: "投資金額", value: investment / 10000 + "万円" },
  ];

  return (
    <div>
      {priceData ? (
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
              <Loding
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  fetchPriceData();
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                }}
              />
            </ul>
            <div
              className={`hidden lg:block w-6/12 p-4 m-5 ${
                theme === "dark" ? "neon-border-blue" : "light-border"
              }`}
            >
              <ResponsiveChart />
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
