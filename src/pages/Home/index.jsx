import React from "react";
import styled from "styled-components";

import theme from "../../theme";
import { Box } from "../../shared/helpers/Box";
import { Grid } from "../../shared/helpers/Grid";
import { Col } from "../../shared/helpers/Grid/Col";
import { Input } from "../../shared/ui-kit/Input";

import { listMenu, cardListHighRate, cardListTrending } from "./mockData";
import Slider from "react-slick";
import { breakpointsAsInts } from "../../theme";
import { ReactComponent as Arrow } from "../../static/icons/rightArrow.svg";
import homeBg from "../../static/images/homeBg.png";
import { Ul, Li } from "../../shared/helpers/List";
import { LinkRenderer, Heading, Paragraph } from "../../shared/helpers/Text";
import { Container } from "../../shared/helpers/Container";
import { Card } from "../../shared/ui-kit/Card";
import { Button } from "../../shared/ui-kit/Button";
import pear from "../../static/icons/pear.svg";
import { Swiper } from "../../shared/ui-kit/Swiper";

const StyledLinkRenderer = styled(LinkRenderer)`
  color: ${theme.colors.background.main};
  &:hover {
    color: ${theme.colors.primary.main};
    text-decoration: underline;
  }
`;

const StyledLogin = styled(Box)`
  background: url(${homeBg}) no-repeat;
  background-size: cover;
  border-radius: 40px 10px;

  width: 96%;
  max-height: 814px;
`;

const SwiperBox = styled(Box)`
  background: url(${pear}) ${theme.colors.primary.main} right no-repeat;

  padding-right: 196px;
  padding-left: 196px;
  border-radius: 40px 10px;
  text-align: center;
`;

export const Home = () => {
  return (
    <>
      <StyledLogin mx={9}>
        <Container py={[50, 110, 243]}>
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
      </StyledLogin>
      <Container mt={105} textAlign="center">
        <Paragraph uppercase fontSize={1} mb={8} color="primary.main">
          users choice
        </Paragraph>
        <Heading as={"h2"} bold mb={8} color="secondary.main">
          20 Highest-Rated Recipes
        </Heading>
        <Grid nested mb={11}>
          {cardListHighRate.map((props, index) => {
            return (
              <Col key={index} span={[4, 6, 3]}>
                <Card {...props} sizes="sm" place="no-rates" />
              </Col>
            );
          })}
        </Grid>
        <Button size="lg" variant="outlined" mb={13}>
          Show More
        </Button>
      </Container>
      <SwiperBox mb={8} mx={9}>
        <Paragraph uppercase fontSize={1} pt={13} color="background.main">
          top 10
        </Paragraph>
        <Heading as={"h2"} bold mt={8} color="secondary.main">
          Trending Recepies
        </Heading>
        <Container mt="48px" mb="112px">
          <Swiper>
            {cardListTrending.map((props, index) => {
              return (
                <Box key={index} px={"12px"}>
                  <Card {...props} width={310} />
                </Box>
              );
            })}
          </Swiper>
        </Container>
        <Button size="lg" variant="outlined" mb={13}>
          Show More
        </Button>
      </SwiperBox>
    </>
  );
};
