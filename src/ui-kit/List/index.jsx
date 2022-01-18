import React from "react";
import styled from "styled-components";

import { Box } from "../Box";

const StyledUl = styled(Box)`
  display: flex;
  list-style-type: none;
`;

const StyledLi = styled(Box)`
  margin-right: 72px;
  &:last-child {
    margin-right: 0px;
  }
`;

export const Ul = (props) => {
  return <StyledUl as="ul" {...props} />;
};
export const Li = (props) => {
  return <StyledLi as="li" {...props} />;
};
