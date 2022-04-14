import React, { useState, useEffect } from "react";

import { useLazyGetFilteredRecipesQuery, useLazyGetRecipeQuery } from "../services/recipe.service";

import { RecipesCard } from "../shared/ui-kit/RecipesCard";
import { Modal } from "../shared/ui-kit/Modal";
import { Recipes } from "../shared/ui-kit/ModalContent/Recipes";
import { Box } from "../shared/helpers/Box";
import { Grid } from "../shared/helpers/Grid";
import { Pagination } from "../shared/ui-kit/Pagination";
import { Loader } from "../shared/ui-kit/Loader";
import { Col } from "../shared/helpers/Grid/Col";
import { colors } from "../theme";

export const SearchRecipeCard = ({ query, timeRange }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [filteredRecipesAction, { data }] = useLazyGetFilteredRecipesQuery();
  const [action, { data: recipe }] = useLazyGetRecipeQuery();

  const sort = query.sort || "";
  const search = query.search || "";

  useEffect(() => {
    filteredRecipesAction({ timeRange, sort, search, page: currentPage }, true);
  }, [timeRange, sort, search, currentPage]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const openRecipe = (_id) => {
    action({ _id }, true);
    toggleModal();
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
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
      {data?.totalPages > 1 && <Pagination totalPages={data?.totalPages} handlePageClick={handlePageClick} />}
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          <Recipes {...recipe} />
        </Modal>
      )}
    </Box>
  );
};
