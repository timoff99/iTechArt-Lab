import React from "react";
import styled from "styled-components";

import { Box } from "../Box";

const StyledUl = styled(Box)`
  list-style-type: none;
`;

const StyledLi = styled(Box)``;

export const Ul = (props) => {
  return <StyledUl as="ul" {...props} />;
};
export const Li = (props) => {
  return <StyledLi as="li" {...props} />;
};
