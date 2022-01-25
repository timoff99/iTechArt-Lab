import React from "react";
import styled from "styled-components";

import { Box } from "../../helpers/Box";
import { Container } from "../../helpers/Container";
import { ReactComponent as Logo2 } from "../../../static/icons/logo2.svg";
import { ReactComponent as ITechArtLogo } from "../../../static/icons/iTechArt-logo.svg";
import theme from "../../../theme";
import { Li, Ul } from "../../helpers/List";
import { LinkRenderer, Paragraph } from "../../helpers/Text";

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

export const Footer = () => {
  return (
    <Box background={theme.colors.secondary.main}>
      <StyledContainer>
        <Logo2 />
        <Ul>
          <Li>
            <LinkRenderer href="/" color="background.main" inline>
              Cookbooks
            </LinkRenderer>
          </Li>
          <Li>
            <LinkRenderer href="/" color="background.main" inline>
              Recipes
            </LinkRenderer>
          </Li>
          <Li>
            <LinkRenderer href="/" color="background.main" inline>
              About Us
            </LinkRenderer>
          </Li>
        </Ul>
        <Paragraph color="primary.main" fontSize={1} mx={80} my={0}>
          plzfeedme@itechart.com
        </Paragraph>
        <Paragraph fontSize={1}>Study Project, 2020</Paragraph>
        <Box>
          <ITechArtLogo />
        </Box>
      </StyledContainer>
    </Box>
  );
};
