import styled from "styled-components";

import { Box } from "../Box";
import { BORDER_RADIUS } from "../../theme";
import theme from "../../theme";
import { Heading } from "../../ui-kit/Text";

export const StyledHeading = styled(Heading)``;

export const StyledCard = styled(Box)`
  background: ${theme.colors.background.main};

  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
  border-radius: ${BORDER_RADIUS}px;

  &:hover {
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.24);
    cursor: pointer;
  }
  &:hover {
    ${StyledHeading},
    svg {
      fill: ${theme.colors.primary.main};
      color: ${theme.colors.primary.main};
    }
  }

  ${(props) => {
    switch (props.sizes) {
      case "sm":
        return `max-width: 288px;`;
      case "lg":
        return `max-width: 392px;`;

      default:
        return `max-width: 288px;`;
    }
  }}
`;

export const Flex = styled(Box)`
  display: flex;
  align-items: center;
`;
