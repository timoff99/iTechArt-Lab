import React, { useState, useEffect } from "react";

import {
  useLazyGetFilteredRecipesQuery,
  useLazyGetRecipeQuery,
  useLazyGetRecipeWithoutViewsPlusOneQuery,
} from "../services/recipe.service";

import { RecipesCard } from "../shared/ui-kit/RecipesCard";
import { Modal } from "../shared/ui-kit/Modal";
import { Recipes } from "../shared/ui-kit/ModalContent/Recipes";
import { Box } from "../shared/helpers/Box";
import { Grid } from "../shared/helpers/Grid";
import { Pagination } from "../shared/ui-kit/Pagination";
import { Loader } from "../shared/ui-kit/Loader";
import { Col } from "../shared/helpers/Grid/Col";
import { colors } from "../theme";
import { Heading } from "../shared/helpers/Text";

export const SearchRecipeCard = ({ query, timeRange }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [filteredRecipesAction, { data }] = useLazyGetFilteredRecipesQuery();
  const [action, { data: recipe }] = useLazyGetRecipeQuery();
  const [actionGetRecipeWithoutViewsPlusOneQuery, { data: recipeWithoutViewsPlusOneQuery }] =
    useLazyGetRecipeWithoutViewsPlusOneQuery();

  const type = query.type || "";
  const sort = query.sort || "";
  const search = query.search || "";

  const refreshRecipes = () => {
    filteredRecipesAction({ type, timeRange, sort, search, page: currentPage });
  };

  const getRecipeWithoutViewsPlusOneQuery = async (_id) => {
    await actionGetRecipeWithoutViewsPlusOneQuery({ _id });
  };

  useEffect(() => {
    refreshRecipes();
  }, [type, timeRange, sort, search, currentPage, recipe]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const openRecipe = async (_id) => {
    await action({ _id }, true);
    toggleModal();
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const checkRecipe = () => {
    if (recipeWithoutViewsPlusOneQuery?._id === recipe?._id) {
      return recipeWithoutViewsPlusOneQuery;
    } else {
      return recipe;
    }
  };

  return (
    <Box>
      <Grid nested mt={11}>
        {data?.recipe ? (
          data?.recipe.map((props, index) => {
            return <RecipesCard openRecipe={openRecipe} key={index} {...props} search={"search"} />;
          })
        ) : (
          <Col display="flex" justifyContent="center">
            <Loader color={colors.primary.main} height={"lg"} width={"lg"} />
          </Col>
        )}
      </Grid>
      {data?.recipe.length === 0 && (
        <Box display="flex" justifyContent="center">
          <Heading as={"h3"}>Empty Page</Heading>
        </Box>
      )}
      {data?.totalPages > 1 && <Pagination totalPages={data?.totalPages} handlePageClick={handlePageClick} />}
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          <Recipes
            {...checkRecipe()}
            refreshRecipes={refreshRecipes}
            getRecipeWithoutViewsPlusOneQuery={getRecipeWithoutViewsPlusOneQuery}
          />
        </Modal>
      )}
    </Box>
  );
};
