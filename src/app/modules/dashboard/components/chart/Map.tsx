import React, {useLayoutEffect} from 'react'
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";


import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const Map = () => {
    useLayoutEffect(() => {
        const root = am5.Root.new("chartdiv");



        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                projection: am5map.geoNaturalEarth1()
            })
        );

        const polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow,
                exclude: ["AQ"]
            })
        );

        polygonSeries.mapPolygons.template.setAll({
            tooltipText: "{name}",
            templateField: "polygonSettings"
        });

        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: am5.color(0x677935)
        });

        polygonSeries.data.setAll([{
            id: "US",
            polygonSettings: {
                fill: am5.color(0xFF3C38)
            }
        }, {
            id: "CA",
            polygonSettings: {
                fill: am5.color(0xA23E48)
            }
        }, {
            id: "MX",
            polygonSettings: {
                fill: am5.color(0xFF8C42)
            }
        }])
        // chart.appear(1000, 100);
    }, [])

    return (
            <div id="chartdiv" className={'h-[330px] relative'}>
                <div className={'w-20 z-10 h-10 absolute bg-[#171825] bottom-0 left-0'}></div>
            </div>
    )
}

export default Map
