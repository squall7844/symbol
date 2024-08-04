"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [mosaics, setMosaics] = useState("");
  const fetchPriceData = () => {
    // 現在のモザイク数を取得
    axios.get("/api/GetMosaic").then((response) => {
      setMosaics(response.data);
    });
  };
  // データをリロード時に取得する
  useEffect(() => {
    fetchPriceData();
  }, []);

  console.log(mosaics);
  return <div>{mosaics}</div>;
};

export default Test;
