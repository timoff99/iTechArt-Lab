import styled from "styled-components";

import { Box } from "../Box";
import { GUTTER, mediaQueries } from "../../theme";
import theme from "../../theme";

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
      max-width: ${theme.maxWidths[1]}px;
   }
   ${mediaQueries.large} {
      max-width: ${theme.maxWidths[2]}px;
   }
  `}
`;
