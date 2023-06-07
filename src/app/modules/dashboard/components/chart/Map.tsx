import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";

import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const Map = () => {
  useLayoutEffect(() => {
    const root = am5.Root.new("chartdiv");

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        projection: am5map.geoNaturalEarth1(),
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      templateField: "polygonSettings",
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935),
    });

    polygonSeries.data.setAll([
      {
        id: "US",
        polygonSettings: {
          fill: am5.color(0xa5b531),
        },
      },
      {
        id: "CA",
        polygonSettings: {
          fill: am5.color(0xc2d24b),
        },
      },
      {
        id: "MX",
        polygonSettings: {
          fill: am5.color(0xc2d24b),
        },
      },
      {
        id: "RU",
        polygonSettings: {
          fill: am5.color(0xd5e26e),
        },
      },
      {
        id: "CN",
        polygonSettings: {
          fill: am5.color(0xe9efbc),
        },
      },
      {
        id: "IN",
        polygonSettings: {
          fill: am5.color(0xc2d24b),
        },
      },
      {
        id: "SA",
        polygonSettings: {
          fill: am5.color(0xc2d24b),
        },
      },
      {
        id: "BR",
        polygonSettings: {
          fill: am5.color(0xe9efbc),
        },
      },
      {
        id: "AR",
        polygonSettings: {
          fill: am5.color(0xe9efbc),
        },
      },
      {
        id: "AU",
        polygonSettings: {
          fill: am5.color(0xc2d24b),
        },
      },
    ]);
    // chart.appear(1000, 100);
  }, []);

  return (
    <div id="chartdiv" className={"h-[330px] relative"}>
      <div
        className={"w-20 z-10 h-10 absolute bg-[#171825] bottom-0 left-0"}
      ></div>
    </div>
  );
};

export default Map;
