"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const ViewChart = () => {
  const chartRef = useRef<am4charts.XYChart>();
  const [chartData, setChartData] = useState<any[]>([]);

  //APIをGETする。
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get("/api/getChart");
        const allData = response.data.data.candlestick[0].ohlcv;
        const weekData = allData.slice(-7).map((item: any[]) => ({
          date: new Date(item[5]),
          open: parseFloat(item[0]),
          high: parseFloat(item[1]),
          low: parseFloat(item[2]),
          close: parseFloat(item[3]),
        }));
        setChartData(weekData);
      } catch (error) {
        console.error("GetCharのAPI取得に失敗しました。", error);
      }
    };
    fetchChartData();
  }, []);

  useEffect(() => {
    // chart全体の設定！！！
    const chart = am4core.create("chartdiv", am4charts.XYChart);
    chartRef.current = chart;
    chart.paddingRight = 20;
    chart.cursor = new am4charts.XYCursor();
    chart.data = chartData;

    // X軸の設定！！！
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.dateFormats.setKey("day", "MM/dd");
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.renderer.labels.template.fill = am4core.color("#FFFFFF"); // 文字の色を白にする
    dateAxis.renderer.grid.template.disabled = true; //罫線をなしにする

    // Y軸の設定！！！
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fill = am4core.color("#FFFFFF"); // 文字の色を白にする
    valueAxis.renderer.grid.template.disabled = true; //罫線をなしにする

    // toolchipの設定！！
    const series = chart.series.push(new am4charts.CandlestickSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "close";
    series.dataFields.openValueY = "open";
    series.dataFields.lowValueY = "low";
    series.dataFields.highValueY = "high";
    series.tooltipText =
      "open: {openValueY.value}\nhigh: {highValueY.value}\nlow: {lowValueY.value}\nclose: {valueY.value}";

    return () => {
      chart.dispose();
    };
  }, [chartData]);

  return (
    <div>
      <h1>XYM/JPY</h1>
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default ViewChart;
