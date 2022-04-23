import React, { useState, useEffect } from "react";

import {
  useLazyGetRecipeQuery,
  useLazyGetRecipeWithoutViewsPlusOneQuery,
  useLazyGetUserRecipesQuery,
} from "../../services/recipe.service";

import { Pagination } from "../../shared/ui-kit/Pagination";
import { RecipesCard } from "../../shared/ui-kit/RecipesCard";
import { Modal } from "../../shared/ui-kit/Modal";
import { Recipes } from "../../shared/ui-kit/ModalContent/Recipes";
import { Grid } from "../../shared/helpers/Grid";
import { Box } from "../../shared/helpers/Box";
import { Col } from "../../shared/helpers/Grid/Col";
import { Loader } from "../../shared/ui-kit/Loader";
import { colors } from "../../theme";
import { Heading } from "../../shared/helpers/Text";

export const RecipeTab = ({ query }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const search = query.search || "";

  const [userRecipeAction, { data }] = useLazyGetUserRecipesQuery();
  const [recipeAction, { data: recipe }] = useLazyGetRecipeQuery();
  const [actionGetRecipeWithoutViewsPlusOneQuery, { data: recipeWithoutViewsPlusOneQuery }] =
    useLazyGetRecipeWithoutViewsPlusOneQuery();

  const refreshRecipes = () => {
    userRecipeAction({ page: currentPage, search });
  };
  useEffect(() => {
    refreshRecipes();
  }, [currentPage, search, recipe]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const getRecipeWithoutViewsPlusOneQuery = async (_id) => {
    await actionGetRecipeWithoutViewsPlusOneQuery({ _id });
  };
  const openRecipe = async (_id) => {
    await recipeAction({ _id }, true);
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
    <Box display="flex" flexDirection="column">
      <Grid nested mb={11}>
        <Col>
          {data?.recipes ? (
            data?.recipes.map((props, index) => {
              return <RecipesCard openRecipe={openRecipe} key={index} {...props} recipeProfile={"recipeProfile"} />;
            })
          ) : (
            <Box display="flex" justifyContent="center">
              <Loader color={colors.primary.main} height={"lg"} width={"lg"} />
            </Box>
          )}
        </Col>
        {showModal && (
          <Modal showModal={showModal} setShowModal={toggleModal}>
            <Recipes
              {...checkRecipe()}
              recipeProfile={"recipeProfile"}
              refreshRecipes={refreshRecipes}
              getRecipeWithoutViewsPlusOneQuery={getRecipeWithoutViewsPlusOneQuery}
            />
          </Modal>
        )}
      </Grid>
      {data?.recipes.length === 0 && (
        <Box display="flex" justifyContent="center">
          <Heading as={"h3"}>Create your first Recipe</Heading>
        </Box>
      )}
      {data?.totalPages > 1 && <Pagination totalPages={data?.totalPages} handlePageClick={handlePageClick} />}
    </Box>
  );
};
