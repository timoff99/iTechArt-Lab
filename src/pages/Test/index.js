import React from "react";

import { cardListHorizontal } from "../Home/mockData";
import { HorizontalCard } from "../../shared/ui-kit/HorizontalCard";
import { Box } from "../../shared/helpers/Box";

export const Test = () => {
  return (
    <div>
      {cardListHorizontal.map((props, index) => {
        return (
          <Box key={index} px={"12px"}>
            <HorizontalCard {...props} place="horizontal" />
          </Box>
        );
      })}
    </div>
  );
};
