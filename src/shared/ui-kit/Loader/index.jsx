import React from "react";
import { TailSpin } from "react-loader-spinner";

import { colors } from "../../../theme";
import { FlexCenter } from "../../helpers/Flex";

const size = {
  sm: 25,
  lg: 100,
};

export const Loader = ({ color = colors.background.main, height = "sm", width = "sm" }) => {
  return (
    <FlexCenter justifyContent="center">
      <TailSpin color={color} height={size[height]} width={size[width]} />
    </FlexCenter>
  );
};
