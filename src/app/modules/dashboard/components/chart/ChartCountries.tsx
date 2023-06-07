/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { useThemeMode } from "../../../../../_metronic/partials";
import {
  getCSS,
  getCSSVariableValue,
} from "../../../../../_metronic/assets/ts/_utils";

type Props = {
  className: string;
};

const ChartCountries: React.FC<Props> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const refreshMode = () => {
    if (!chartRef.current) {
      return;
    }

    const height = parseInt(getCSS(chartRef.current, "height"));

    const chart = new ApexCharts(chartRef.current, getChartOptions(height));
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
      style={{ height: "", width: "100%" }}
    ></div>
  );
};

export { ChartCountries };

function getChartOptions(height: number): ApexOptions {
  const labelColor = getCSSVariableValue("--kt-gray-500");
  const borderColor = getCSSVariableValue("--kt-gray-200");
  const baseColor = getCSSVariableValue("--kt-info");
  const lightColor = getCSSVariableValue("--kt-info-light");

  return {
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],

    chart: {
      type: "bar",
      height: 330,
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        dataLabels: {
          position: "end",
          hideOverflowingLabels: true,
          orientation: "horizontal",
          maxItems: 100,
        },
      },
    },
    fill: {
      colors: ["#C2D24B"],
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    xaxis: {
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "Germany",
      ],
      labels: {
        show: false,
      },

      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  };
}
