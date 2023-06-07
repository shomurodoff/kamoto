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

const ChartOne: React.FC<Props> = ({ className }) => {
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
      style={{ height: "100px", width: "100%" }}
    ></div>
  );
};

export { ChartOne };

function getChartOptions(height: number): ApexOptions {
  const labelColor = getCSSVariableValue("--kt-gray-500");
  const borderColor = getCSSVariableValue("--kt-gray-200");
  const baseColor = getCSSVariableValue("--kt-info");
  const lightColor = getCSSVariableValue("--kt-info-light");

  return {
    series: [
      {
        name: "Net Profit",
        data: [10, -40, 40, 10, -57, 9, 10, -30],
      },
      {
        name: " Profit",
        data: [10, -40, 40, 10, -57, 9, 10, -30].reverse(),
      },
    ],
    chart: {
      height: 140,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 2,
      colors: ["#C2D24B", "#8898A6"],
    },
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        position: "front",
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      show: false,
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
  };
}
