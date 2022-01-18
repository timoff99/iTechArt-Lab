import React from "react";
import styled from "styled-components";

import theme from "../../theme";
import { Box } from "../../ui-kit/Box";
import { Grid } from "../../ui-kit/Grid";
import { Col } from "../../ui-kit/Grid/Col";
import { Input } from "../../ui-kit/Input";
import { listMenu } from "./mockData";
import homeBg from "../../static/images/homeBg.png";
import { Ul, Li } from "../../ui-kit/List";
import { LinkRenderer, Heading } from "../../ui-kit/Text";
import { Container } from "../../ui-kit/Container";
import { mediaQueries } from "../../theme";

const StyledLinkRenderer = styled(LinkRenderer)`
  color: ${theme.colors.background.main};
  &:hover {
    color: ${theme.colors.primary.main};
    text-decoration: underline;
  }
`;

const StyledLogin = styled(Box)`
  background: url(${homeBg}) no-repeat;
  background-size: contain;
  border-radius: 40px 10px;
  position: absolute;
  height: 100%;
  width: calc(100% - 32px);
  max-height: 814px;
  max-width: 1616px;
  z-index: -1;
  ${mediaQueries.medium} {
    left: -200px;
    width: 1300px;
  }
  ${mediaQueries.large} {
    left: -100px;
    width: 1500px;
  }
`;

export const Home = () => {
  return (
    <Container position="relative">
      <StyledLogin />
      <Container py={[50, 180, 243]}>
        <Heading as={"h1"} semiBold mb={11} color="background.main" maxWidth={808}>
          Find Recipies and Сreate Your Favourite Сookbooks
        </Heading>
        <Grid nested>
          <Col span={[4, 12, 10]}>
            <Input
              type="text"
              name="bigSearch"
              variantInput="bigInput"
              inputSize="lg"
              lableSize="lg"
              placeholder="Find Best Recipies..."
            />
          </Col>
          <Ul>
            {listMenu.map(({ menu }, index) => {
              return (
                <Li key={index}>
                  <StyledLinkRenderer href="/" inline fontSize={2}>
                    {menu}
                  </StyledLinkRenderer>
                </Li>
              );
            })}
          </Ul>
        </Grid>
      </Container>
    </Container>
  );
};
