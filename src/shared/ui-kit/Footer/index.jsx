import React from "react";
import styled from "styled-components";

import { Box } from "../../helpers/Box";
import { Container } from "../../helpers/Container";
import { ReactComponent as Logo2 } from "../../../static/icons/logo2.svg";
import { ReactComponent as ITechArtLogo } from "../../../static/icons/iTechArt-logo.svg";
import theme from "../../../theme";
import { Li, Ul } from "../../helpers/List";
import { LinkRenderer, Paragraph } from "../../helpers/Text";
import { ROUTE_NAMES } from "../../../router/routeNames";

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
      <StyledContainer flexDirection={["column", "column", "row"]}>
        <Logo2 />
        <Ul display={["flex", null, null]} flexDirection={["column", "row", "row"]} p={0}>
          <Li m={5}>
            <LinkRenderer href={ROUTE_NAMES.SEARCHTABCOOKBOOKS} color="background.main" inline>
              Cookbooks
            </LinkRenderer>
          </Li>
          <Li m={5}>
            <LinkRenderer href={ROUTE_NAMES.SEARCHTABRECIPES} color="background.main" inline>
              Recipes
            </LinkRenderer>
          </Li>
          <Li m={5}>
            <LinkRenderer href={ROUTE_NAMES.HOME} color="background.main" inline>
              About Us
            </LinkRenderer>
          </Li>
        </Ul>
        <Paragraph color="primary.main" fontSize={1} mx={80} my={0} m={5}>
          plzfeedme@itechart.com
        </Paragraph>
        <Paragraph fontSize={1} m={5}>
          Study Project, 2022
        </Paragraph>
        <Box m={5}>
          <ITechArtLogo />
        </Box>
      </StyledContainer>
    </Box>
  );
};
