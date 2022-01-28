import styled from "styled-components";

import { Box } from "../../helpers/Box";
import { Heading } from "../../helpers/Text";
import { BORDER_RADIUS } from "../../../theme";
import theme from "../../../theme";

export const StyledCard = styled(Box)`
  display: inline-block;
  background: ${theme.colors.background.main};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
  border-radius: ${BORDER_RADIUS}px;
  transition: all 0.4s;

  &:hover {
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.24);
    cursor: pointer;
    transition: all 0.4s;
  }
  ${({ place }) => {
    switch (place) {
      case "highest-rates":
        return `
        &:hover {
    ${Heading},
    svg {
      fill: ${theme.colors.primary.main};
      color: ${theme.colors.primary.main};
      transition: all 0.4s;
    }
  }`;
      case "no-rates":
        return `
        &:hover {
     path {
      fill: ${theme.colors.primary.main};
      transition: all 0.4s;
    }
  }`;

      case "horizontal":
        return `
        &:hover {
     path, circle {
      fill: ${theme.colors.primary.main};
      circle: ${theme.colors.primary.main};
      transition: all 0.4s;
    }
  }`;

      default:
        return `
        &:hover {
    ${Heading},
    svg {
      fill: ${theme.colors.primary.main};
      color: ${theme.colors.primary.main};
      transition: all 0.4s;
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