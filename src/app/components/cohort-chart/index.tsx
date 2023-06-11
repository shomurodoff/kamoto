/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import {
  getCSS,
  getCSSVariableValue,
} from "../../../_metronic/assets/ts/_utils";
import { useThemeMode } from "../../../_metronic/partials";
import { toNumber } from "lodash";

type Props = {
  className: string;
  withData?: boolean;
};

const CorothonChart: React.FC<Props> = ({ className, withData }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const refreshMode = () => {
    if (!chartRef.current) {
      return;
    }

    const height = parseInt(getCSS(chartRef.current, "height"));

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height, withData)
    );
    if (chart) {
      chart.render();
    }

    return chart;
  };

  useEffect(() => {
    const chart = refreshMode();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef, mode]);

  return (
    <div
      ref={chartRef}
      id="kt_charts_widget_3_chart"
      style={{ height: "100px", width: "100%" }}
    ></div>
  );
};

export { CorothonChart };

function getChartOptions(height: number, withData?: boolean): ApexOptions {
  const labelColor = getCSSVariableValue("--kt-gray-500");
  const borderColor = getCSSVariableValue("--kt-gray-200");
  const baseColor = getCSSVariableValue("--kt-info");
  const lightColor = getCSSVariableValue("--kt-info-light");

  return {
    series: [
      {
        name: "1",
        data: [1],
      },
      {
        name: "2",
        data: [1, 2],
      },
      {
        name: "3",
        data: [1, 2, 3],
      },
      {
        name: "4",
        data: [1, 2, 3, 3],
      },
      {
        name: "5",
        data: [1, 2, 3, 6, 7],
      },
      {
        name: "6",
        data: [1, 2, 3, 3, 4, 6],
      },
      {
        name: "7",
        data: [10, 40, 40, 10, -57, 9, 10, 30],
      },
      {
        name: "8",
        data: [10, 40, 40, 10, 57, 9, 10, 30],
      },
      {
        name: "9",
        data: [10, 20, 40, 10, 57, 9, 10, -30],
      },
      {
        name: "10",
        data: [10, 40, 40, 10, 57, 9, 10, 30],
      },
      {
        name: "11",
        data: [10, 40, 40, 10, 57, 9, 10, 30, 100, 90, 30],
      },
      {
        name: "12",
        data: [10, 40, 40, 10, 57, 9, 10, 0, 60, 70, 30, 40],
      },
    ],
    chart: {
      height: 250,
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      show: true,
      colors: ["#171825"],
      width: 2,
      dashArray: 0,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#C2D24B"],
    // colors: ["#C2D24B", "#C2D24B"],
    plotOptions: {
      heatmap: {
        radius: 0,
        // distributed: false,
      },
    },
    legend: {
      // show: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        console.log(w, "SSSD");
        console.log(series, "series");
        console.log(seriesIndex, "seriesIndex");
        console.log(dataPointIndex, "dataPointIndex");
        return (
          '<div class="p-4 bg-[#2E2F45] rounded">' +
          "<span>" +
          " after " +
          toNumber(seriesIndex + 1) +
          " month " +
          series[seriesIndex][dataPointIndex] +
          "</span>" +
          "</div>"
        );
      },
    },
    yaxis: {
      show: false,
    },
  };
}
