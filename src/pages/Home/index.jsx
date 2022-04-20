import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import theme, { colors } from "../../theme";
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
import { Recipes } from "../../shared/ui-kit/ModalContent/Recipes";
import { VerticalRecipesCard } from "../../shared/ui-kit/VerticalRecipesCard";
import { CookbookCollection } from "../../shared/ui-kit/ModalContent/CookbookCollection";
import { Loader } from "../../shared/ui-kit/Loader";

import { PopularCard } from "../../components/Home/PopularCard";
import { listMenu } from "./mockData";
import { ROUTE_NAMES } from "../../router/routeNames";
import pear from "../../static/icons/pear.svg";
import homeBg from "../../static/images/homeBg.png";

import { useLazyGetRecipesForMainQuery, useLazyGetRecipeQuery } from "../../services/recipe.service";
import {
  useGetFourCookbookCollectionQuery,
  useLazyGetOneCookbookCollectionQuery,
} from "../../services/cookbookCollection.service";
import { useEffect } from "react";

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

  const [likesRecipesAction, { data: likesRecipes }] = useLazyGetRecipesForMainQuery();
  const [viewsRecipesAction, { data: viewsRecipes }] = useLazyGetRecipesForMainQuery();
  const { data: fourCookbookCollection } = useGetFourCookbookCollectionQuery();
  const [action, { data: recipe }] = useLazyGetRecipeQuery();
  const [cookbookCollectionAction, { data: oneCookbookCollection }] = useLazyGetOneCookbookCollectionQuery();
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

  useEffect(() => {
    likesRecipesAction({ limit: 4, type: "likes" });
    viewsRecipesAction({ limit: 9, type: "views" });
  }, [recipe]);

  const openRecipe = (_id) => {
    action({ _id }, true);
    toggleRecipeModal();
  };
  const openCookBook = (_id) => {
    cookbookCollectionAction({ id: _id }, true);
    toggleCookBookModal();
  };

  return (
    <>
      <StyledLogin mx={[2, 2, 9]}>
        <Container py={[50, 110, 243]}>
          <Heading as={"h1"} semiBold mb={11} color="background.main" maxWidth={808}>
            Find Recipes and Сreate Your Favourite Сookbooks
          </Heading>
          <Grid nested>
            <Col span={[4, 12, 10]}>
              <Input
                type="text"
                name="bigSearch"
                variantInput={["middleInput", "bigInput", "bigInput"]}
                inputSize="lg"
                labelSize="lg"
                placeholder="Find Best Cookbooks..."
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
          4 Highest-Rated Recipes
        </Heading>
        <Grid nested mt={10}>
          {likesRecipes?.recipes ? (
            likesRecipes?.recipes.map((props, index) => {
              return (
                <Col key={index} span={[4, 6, 3]} display="flex" justifyContent="center" mb={4}>
                  <VerticalRecipesCard
                    {...props}
                    sizes="sm"
                    openRecipe={openRecipe}
                    place="no-rates"
                    maxWidth={"500px"}
                  />
                </Col>
              );
            })
          ) : (
            <Col display="flex" justifyContent="center">
              <Loader color={colors.primary.main} height={"lg"} width={"lg"} />
            </Col>
          )}
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
          Picked By Us
        </Heading>
        <PopularCard items={fourCookbookCollection} variant={"secondary"} openCookBook={openCookBook} mb={100} />
        <LinkRenderer href={ROUTE_NAMES.SEARCHTABCOOKBOOKS} inline mt={10} mb={13}>
          <Button size="lg" variant="outlined">
            Show More
          </Button>
        </LinkRenderer>
      </Container>
      <SwiperBox mb={8} mx={[0, 9, 9]} px={["16px", "16px", "150px"]}>
        <Paragraph uppercase fontSize={1} pt={13} color="background.main">
          top 9
        </Paragraph>
        <Heading as={"h2"} bold mt={8} color="secondary.main">
          Trending Recipes
        </Heading>
        <Box mt="48px" mb="112px">
          <Swiper>
            {viewsRecipes?.recipes ? (
              viewsRecipes?.recipes.map((props, index) => {
                return (
                  <Box key={index}>
                    <VerticalRecipesCard
                      maxWidth={"450px"}
                      {...props}
                      sizes="sm"
                      openRecipe={openRecipe}
                      place="no-rates"
                    />
                  </Box>
                );
              })
            ) : (
              <Box display="flex" justifyContent="center">
                <Loader height={"lg"} width={"lg"} />
              </Box>
            )}
          </Swiper>
        </Box>
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
          <CookbookCollection {...oneCookbookCollection} />
        </Modal>
      )}
    </>
  );
};
