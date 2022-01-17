import React from "react";
import styled from "styled-components";

import { Box } from "../Box";
import { Container } from "../Container";
import { ReactComponent as Logo2 } from "../../static/icons/logo2.svg";
import { ReactComponent as ITechArtLogo } from "../../static/icons/iTechArt-logo.svg";
import theme from "../../theme";

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 17px auto;
  color: ${theme.colors.background.main};
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;

const Ul = styled(Box)`
  display: flex;
  list-style-type: none;
`;

const Li = styled(Box)`
  margin-right: 72px;
  &:last-child {
    margin-right: 0px;
  }
  cursor: pointer;
`;
const Email = styled(Box)`
  color: ${theme.colors.primary.main};
  margin: 0 80px;
  cursor: pointer;
`;

export const Footer = () => {
  return (
    <Box background={theme.colors.secondary.main}>
      <StyledContainer>
        <Logo2 />
        <Ul>
          <Li>Cookbooks</Li>
          <Li>Recepies</Li>
          <Li>About Us</Li>
        </Ul>
        <Email>plzfeedme@itechart.com</Email>
        <Box>Study Project, 2020</Box>
        <Box>
          <ITechArtLogo />
        </Box>
      </StyledContainer>
    </Box>
  );
};
