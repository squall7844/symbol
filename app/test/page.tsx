"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [DbData, setDbData] = useState<any>(null);
  // DB情報を取得する
  const fetchDBData = () => {
    axios.get("/api/GetDB").then((response) => {
      setDbData(response.data);
    });
  };
  // データをリロード時に取得する
  useEffect(() => {
    fetchDBData();
  }, []);

  return (
    <div>
      {/* <div>{JSON.stringify(DbData)}</div> */}
      <div>{DbData}</div>
    </div>
  );
};

export default Test;
