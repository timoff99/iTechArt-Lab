import React from "react";
import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";

import theme from "../../../theme";
import { Paragraph } from "../../../shared/helpers/Text";

const { createSliderWithTooltip } = RcSlider;
const Range = createSliderWithTooltip(RcSlider.Range);

export const Slider = ({ timeRange, setTimeRange }) => {
  const handleClick = () => {
    console.log(timeRange);
  };

  const handleChange = (sliderValues) => {
    setTimeRange(sliderValues);
  };
  return (
    <Range
      min={0}
      max={240}
      defaultValue={timeRange}
      onChange={handleChange}
      marks={{
        0: (
          <Paragraph color="secondary.main" ml={7}>
            1min
          </Paragraph>
        ),
        240: (
          <Paragraph color="secondary.main" mr={10}>
            4hours
          </Paragraph>
        ),
      }}
      tipFormatter={(value) => <span>{value} min</span>}
      allowCross={false}
      trackStyle={[{ backgroundColor: `${theme.colors.primary.main}` }]}
      handleStyle={[
        {
          backgroundColor: `${theme.colors.primary.main}`,
          borderColor: "transparent",
          boxShadow: "unset",
        },
      ]}
      railStyle={{ backgroundColor: `${theme.colors.primary.main}`, opacity: 0.2 }}
    />
  );
};
