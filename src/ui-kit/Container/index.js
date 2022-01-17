import styled from "styled-components";
import { Box } from "../Box";
import { GUTTER, mediaQueries } from "../../theme";

export const Container = styled(Box)`
  width: 100%;
  ${({ noPadding }) =>
    !noPadding &&
    `
    padding-left: ${GUTTER / 2}px;  
    padding-right: ${GUTTER / 2}px;
  `}
  margin-left: auto;
  margin-right: auto;
  ${({ fullBleed }) =>
    !fullBleed &&
    `
   ${mediaQueries.medium} {
      max-width: 740px;
   }
   ${mediaQueries.large} {
      max-width: 1224px;
   }
  `}
`;
