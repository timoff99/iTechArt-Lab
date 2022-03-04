import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import theme from "../../theme";
import { Box } from "../../shared/helpers/Box";
import { Grid } from "../../shared/helpers/Grid";
import { Col } from "../../shared/helpers/Grid/Col";
import { Ul, Li } from "../../shared/helpers/List";
import { Container } from "../../shared/helpers/Container";
import { LinkRenderer, Heading, Paragraph } from "../../shared/helpers/Text";

import { Input } from "../../shared/ui-kit/Input";
import { Swiper } from "../../shared/ui-kit/Swiper";
import { Button } from "../../shared/ui-kit/Button";
import { Modal } from "../../shared/ui-kit/Modal";
import { CookBook } from "../../shared/ui-kit/ModalContent/CookBook";
import { Recipes } from "../../shared/ui-kit/ModalContent/Recipes";
import { VerticalRecipesCard } from "../../shared/ui-kit/VerticalRecipesCard";
import { PopularCard } from "../../components/Home/PopularCard";

import { listMenu } from "./mockData";
import pear from "../../static/icons/pear.svg";
import homeBg from "../../static/images/homeBg.png";

import { useGetRecipesForMainQuery, useLazyGetRecipeQuery } from "../../services/recipe.service";
import { useGetCookBooksForMainQuery, useLazyGetCookBookQuery } from "../../services/cookbook.service";
import { ROUTE_NAMES } from "../../router/routeNames";

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
  border-radius: 40px 10px;
  text-align: center;
`;

export const Home = () => {
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showCookBookModal, setShowCookBookModal] = useState(false);

  const { data: likesRecipes } = useGetRecipesForMainQuery({ limit: 4, type: "likes" });
  const { data: viewsRecipes } = useGetRecipesForMainQuery({ limit: 9, type: "views" });
  const { data: viewsCookBooks } = useGetCookBooksForMainQuery({ limit: 4, type: "views" });
  const [action, { data: recipe }] = useLazyGetRecipeQuery();
  const [cookBookAction, { data: cookBook }] = useLazyGetCookBookQuery();
  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target[0].value;
    navigation(`${ROUTE_NAMES.SEARCHTABCOOKBOOKS}&search=${searchValue}`);
  };

  const toggleRecipeModal = () => {
    setShowRecipeModal((prev) => !prev);
  };
  const toggleCookBookModal = () => {
    setShowCookBookModal((prev) => !prev);
  };

  const openRecipe = (_id) => {
    action(_id, true);
    toggleRecipeModal();
  };
  const openCookBook = (_id) => {
    cookBookAction(_id, true);
    toggleCookBookModal();
  };
  return (
    <>
      <StyledLogin mx={9}>
        <Container py={[50, 110, 243]}>
          <Heading as={"h1"} semiBold mb={11} color="background.main" maxWidth={808}>
            Find Recipes and Сreate Your Favourite Сookbooks
          </Heading>
          <Grid nested>
            <Col span={[4, 12, 10]}>
              <Input
                type="text"
                name="bigSearch"
                variantInput="bigInput"
                inputSize="lg"
                labelSize="lg"
                placeholder="Find Best Recipes..."
                handleSubmit={handleSubmit}
                as={"form"}
              />
            </Col>
            <Ul display={["none", "flex", null]}>
              {listMenu.map(({ children, value }, index) => {
                return (
                  <Li key={index} mr={10}>
                    <StyledLinkRenderer href={`${ROUTE_NAMES.SEARCHTABCOOKBOOKS}&type=${value}`} inline fontSize={2}>
                      {children}
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
        <Grid nested mt={10}>
          {likesRecipes?.recipes &&
            likesRecipes?.recipes.map((props, index) => {
              return (
                <Col key={index} span={[4, 6, 3]}>
                  <VerticalRecipesCard {...props} sizes="sm" openRecipe={openRecipe} place="no-rates" />
                </Col>
              );
            })}
        </Grid>
        <LinkRenderer href={ROUTE_NAMES.SEARCHTABRECIPES} inline mt={10} mb={13}>
          <Button size="lg" variant="outlined">
            Show More
          </Button>
        </LinkRenderer>
      </Container>
      <Container mt={5} textAlign="center">
        <Paragraph uppercase fontSize={1} mb={8} color="primary.main">
          Our choice
        </Paragraph>
        <Heading as={"h2"} bold mb={8} color="secondary.main">
          Most Popular CookBooks
        </Heading>
        <PopularCard items={viewsCookBooks?.cookbooks} variant={"secondary"} openCookBook={openCookBook} mb={100} />
        <LinkRenderer href={ROUTE_NAMES.SEARCHTABCOOKBOOKS} inline mt={10} mb={13}>
          <Button size="lg" variant="outlined">
            Show More
          </Button>
        </LinkRenderer>
      </Container>
      <SwiperBox mb={8} mx={[5, 9, 9]} px={[1, "196px", "196px"]}>
        <Paragraph uppercase fontSize={1} pt={13} color="background.main">
          top 10
        </Paragraph>
        <Heading as={"h2"} bold mt={8} color="secondary.main">
          Trending Recipes
        </Heading>
        <Container mt="48px" mb="112px">
          <Swiper>
            {viewsRecipes?.recipes &&
              viewsRecipes?.recipes.map((props, index) => {
                return (
                  <Box key={index}>
                    <VerticalRecipesCard
                      maxWidth={"288px"}
                      {...props}
                      sizes="sm"
                      openRecipe={openRecipe}
                      place="no-rates"
                    />
                  </Box>
                );
              })}
          </Swiper>
        </Container>
        <LinkRenderer href={ROUTE_NAMES.SEARCHTABRECIPES} inline mb={13}>
          <Button size="lg" variant="outlined">
            Show More
          </Button>
        </LinkRenderer>
      </SwiperBox>
      {showRecipeModal && (
        <Modal showModal={showRecipeModal} setShowModal={setShowRecipeModal}>
          <Recipes {...recipe} />
        </Modal>
      )}
      {showCookBookModal && (
        <Modal showModal={showCookBookModal} setShowModal={setShowCookBookModal}>
          <CookBook {...cookBook} />
        </Modal>
      )}
    </>
  );
};
