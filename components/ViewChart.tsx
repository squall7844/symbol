"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const ViewChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get("/api/GetChart");
        const allData = response.data.data.candlestick[0].ohlcv;
        const weekData = allData.slice(-7).map((item: any[]) => ({
          time: new Date(item[5]),
          open: parseFloat(item[0]),
          high: parseFloat(item[1]),
          low: parseFloat(item[2]),
          close: parseFloat(item[3]),
        }));
        setChartData(weekData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchChartData();
  }, []);

  const data = {
    labels: chartData.map((item) => item.time),
    datasets: [
      {
        label: "Open",
        data: chartData.map((item) => item.open),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "High",
        data: chartData.map((item) => item.high),
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Low",
        data: chartData.map((item) => item.low),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Close",
        data: chartData.map((item) => item.close),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    scales: {
      // X軸の設定
      x: {
        title: {
          display: false,
          text: "日付",
        },
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "MM/dd",
          },
          tooltipFormat: "yyyy-MM-dd",
        },
      },
      // Y軸の設定
      y: {
        title: {
          display: false,
          text: "価格",
        },
      },
    },
  };

  return (
    <div>
      <h1>XYM/JPY </h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ViewChart;
