"use client";
import { useEffect, useState } from "react";
import Chart from "@/components/Chart/ViewChart";

const ResponsiveChart = () => {
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowChart(window.innerWidth >= 1024); // 1024pxはlgのブレークポイント
    };

    // 初期サイズを設定
    handleResize();

    // リサイズイベントを監視
    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return showChart ? <Chart /> : null;
};

export default ResponsiveChart;
