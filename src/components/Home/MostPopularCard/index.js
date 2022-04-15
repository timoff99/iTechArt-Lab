import React from "react";

import { Paragraph } from "../../../shared/helpers/Text";
import { StyledButton, RelativeCard, BoxGradient } from "./styles";

export const MostPopularCard = ({ items, variant, openCookBook, pt }) => {
  const handleClick = (e, items) => {
    e.preventDefault();
    e.stopPropagation();
    openCookBook(items._id);
  };

  return (
    <RelativeCard bg={items?.image} pt={pt}>
      <BoxGradient>
        <StyledButton ml={8} mb={8} alignSelf="flex-end" variant={variant} onClick={(e) => handleClick(e, items)}>
          <Paragraph fontWeight={"normal"} fontSize={[2, 0, 2]} overflow="hidden" height={["24px", "20px", "24px"]}>
            {items?.title}
          </Paragraph>
        </StyledButton>
      </BoxGradient>
    </RelativeCard>
  );
};
