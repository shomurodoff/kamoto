import React from "react";
import Slider from "rc-slider";

type Props = {
  startLabel: string;
  stopLabel: string;
};
const Index: React.FC<Props> = ({
  startLabel = "startLabel",
  stopLabel = "stopLabel",
}) => {
  return (
    <div className={"my-[20px]"}>
      <Slider
        marks={{
          0: <label>{startLabel}</label>,
          30: <label>{stopLabel}</label>,
        }}
        className={"custom-slider"}
        dots={true}
        min={0}
        max={30}
        railStyle={{
          background: "#2E2F45",
          height: 10,
          borderRadius: 2,
        }}
        trackStyle={{
          background: "#C2D24B",
          height: 10,
          borderRadius: 2,
        }}
        dotStyle={{
          borderRadius: 0,
          width: 0.1,
          boxShadow: "none",
          border: "none",
        }}
        handleStyle={{
          marginTop: -3,
          opacity: 1,
          border: "none",
          height: 16,
          width: 16,
          background: "#fff",
        }}
      />
    </div>
  );
};

export default Index;
