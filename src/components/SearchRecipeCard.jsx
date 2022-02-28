import React, { useState } from "react";

import { useGetFilteredRecipesQuery, useLazyGetRecipeQuery } from "../services/recipe.service";
import { RecipesCard } from "../shared/ui-kit/RecipesCard";
import { Modal } from "../shared/ui-kit/Modal";
import { Recipes } from "../shared/ui-kit/ModalContent/Recipes";

export const SearchRecipeCard = ({ timeRange }) => {
  const [showModal, setShowModal] = useState(false);
  const { data } = useGetFilteredRecipesQuery(timeRange);
  const [action, { data: recipe }] = useLazyGetRecipeQuery();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const openRecipe = (_id) => {
    action(_id, true);
    toggleModal();
  };

  return (
    <>
      {data &&
        data.map((props, index) => {
          return <RecipesCard openRecipe={openRecipe} key={index} {...props} search={"search"} />;
        })}
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          <Recipes {...recipe} />
        </Modal>
      )}
    </>
  );
};
