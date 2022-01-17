import styled from "styled-components";
import { Box } from "../Box";
import { Container } from "../Container";
import { GUTTER } from "../../theme";
import React from "react";
import { Col } from "./Col";

const BaseGrid = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  ${({ noPadding }) =>
    !noPadding &&
    `
   margin-left: -${GUTTER / 2}px;
   margin-right: -${GUTTER / 2}px;
 `}
  > ${Col} {
    ${({ noPadding }) =>
      noPadding &&
      `
   padding-left: 0;
   padding-right: 0;
  `}
  }
`;
export const Grid = ({ fullBleed, nested, ...props }) => {
  if (nested) {
    return <BaseGrid {...props} />;
  }
  return (
    <Container noPadding={props.noPadding} fullBleed={fullBleed}>
      <BaseGrid {...props} />
    </Container>
  );
};
