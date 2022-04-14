import React, { useState, useEffect } from "react";

import { useLazyGetRecipeQuery, useLazyGetUserRecipesQuery } from "../../services/recipe.service";

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

export const RecipeTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [userRecipeAction, { data }] = useLazyGetUserRecipesQuery();
  const [recipeAction, { data: recipe }] = useLazyGetRecipeQuery();

  useEffect(() => {
    userRecipeAction(currentPage, true);
  }, [currentPage]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const openRecipe = (_id) => {
    recipeAction({ _id }, true);
    toggleModal();
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Grid nested mb={11}>
        <Col>
          {data?.recipes ? (
            data?.recipes.map((props, index) => {
              return <RecipesCard openRecipe={openRecipe} key={index} {...props} profile={"profile"} />;
            })
          ) : (
            <Box display="flex" justifyContent="center">
              <Loader color={colors.primary.main} height={"lg"} width={"lg"} />
            </Box>
          )}
        </Col>
        {showModal && (
          <Modal showModal={showModal} setShowModal={toggleModal}>
            <Recipes {...recipe} />
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
