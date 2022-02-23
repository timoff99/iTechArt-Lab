import React, { useCallback } from "react";
import debounce from "lodash/debounce";
import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";

import theme from "../../../theme";
import { Paragraph } from "../../helpers/Text";

const { createSliderWithTooltip } = RcSlider;
const Range = createSliderWithTooltip(RcSlider.Range);
const CreateSlider = createSliderWithTooltip(RcSlider);

export const Slider = ({ timeRange, setTimeRange, type = "range", onChange }) => {
  const debouncedChange = debounce((sliderValues) => {
    setTimeRange(sliderValues);
    onChange && onChange(sliderValues);
  }, 500);

  const handleChange = useCallback(
    (sliderValues) => {
      debouncedChange(sliderValues);
    },
    [debouncedChange]
  );
  return (
    <>
      {type === "range" && (
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
      )}
      {type === "create" && (
        <CreateSlider
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
      )}
    </>
  );
};
