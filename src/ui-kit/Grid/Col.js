import { GRID_COLS, GUTTER, mediaQueries } from "../../theme";
import { Box } from "../Box";
import styled from "styled-components";

export const Col = styled(Box)`
  padding-left: ${GUTTER / 2}px;
  padding-right: ${GUTTER / 2}px;

  // Column width
  width: ${({ span }) =>
    span ? `${(span[0] / GRID_COLS[0]) * 100}%` : "100%"};

  ${({ span }) =>
    span &&
    span.length > 1 &&
    `
    ${mediaQueries.medium} {
      width: ${(span[1] / GRID_COLS[1]) * 100}%;
    }
  `}
  ${({ span }) =>
    span &&
    span.length > 2 &&
    `
    ${mediaQueries.large} {
      width: ${(span[2] / GRID_COLS[2]) * 100}%;
    }
  `}
  
  // Column offset
  margin-left: ${({ offset }) =>
    offset && `${(offset[0] / GRID_COLS[0]) * 100}%`};

  ${({ offset }) =>
    offset &&
    offset.length > 1 &&
    `
    ${mediaQueries.medium} {
      margin-left: ${(offset[1] / GRID_COLS[1]) * 100}%;
    }
  `}
  ${({ offset }) =>
    offset &&
    offset.length > 2 &&
    `
    ${mediaQueries.large} {
      margin-left: ${(offset[2] / GRID_COLS[2]) * 100}%;
    }
  `}
`;
