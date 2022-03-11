import React, { useState, useEffect } from "react";

import { Pagination } from "../../shared/ui-kit/Pagination";
import { useLazyGetRecipeQuery, useLazyGetUserRecipesQuery } from "../../services/recipe.service";
import { RecipesCard } from "../../shared/ui-kit/RecipesCard";
import { Modal } from "../../shared/ui-kit/Modal";
import { Recipes } from "../../shared/ui-kit/ModalContent/Recipes";
import { Grid } from "../../shared/helpers/Grid";
import { Box } from "../../shared/helpers/Box";
import { Col } from "../../shared/helpers/Grid/Col";

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
    recipeAction(_id, true);
    toggleModal();
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Grid nested mb={11}>
        <Col>
          {data?.recipes &&
            data?.recipes.map((props, index) => {
              return <RecipesCard openRecipe={openRecipe} key={index} {...props} profile={"profile"} />;
            })}
        </Col>
        {showModal && (
          <Modal showModal={showModal} setShowModal={toggleModal}>
            <Recipes {...recipe} />
          </Modal>
        )}
      </Grid>
      {data?.totalPages > 1 && <Pagination totalPages={data?.totalPages} handlePageClick={handlePageClick} />}
    </Box>
  );
};
