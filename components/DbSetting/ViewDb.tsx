"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewDb = () => {
  const [DbData, setDbData] = useState<any>(null);
  const fetchPriceData = () => {
    // DB情報を取得
    axios
      .get("/api/GetDB")
      .then((response) => {
        setDbData(response.data);
      })
      .catch((error) => {
        console.error("GetDBのAPI取得に失敗しました。:", error);
      });
  };
  // データをリロード時に取得する
  useEffect(() => {
    fetchPriceData();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default ViewDb;
