import styled from "styled-components";

import { Box } from "../../helpers/Box";
import { Heading } from "../../helpers/Text";
import { BORDER_RADIUS } from "../../../theme";
import theme from "../../../theme";

export const StyledHeading = styled(Heading)``;

export const StyledCard = styled(Box)`
  display: inline-block;
  background: ${theme.colors.background.main};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
  border-radius: ${BORDER_RADIUS}px;

  &:hover {
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.24);
    cursor: pointer;
  }
  ${({ place }) => {
    switch (place) {
      case "highest-rates":
        return `
        &:hover {
    ${StyledHeading},
    svg {
      fill: ${theme.colors.primary.main};
      color: ${theme.colors.primary.main};
    }
  }`;
      case "no-rates":
        return `
        &:hover {
     path {
      fill: ${theme.colors.primary.main};
    }
  }`;

      default:
        return `
        &:hover {
    ${StyledHeading},
    svg {
      fill: ${theme.colors.primary.main};
      color: ${theme.colors.primary.main};
    }
  }`;
    }
  }}/* ${(props) => {
    /////becouse of display: inline-block
    switch (props.sizes) {
      case "sm":
        return `max-width: 288px;`;
      case "lg":
        return `max-width: 392px;`;

      default:
        return `max-width: 288px;`;
    }
  }} */
`;
