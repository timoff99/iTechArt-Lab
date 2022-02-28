import React, { useState } from "react";
import { useGetUserRecipesQuery, useLazyGetRecipeQuery } from "../../services/recipe.service";
import { RecipesCard } from "../../shared/ui-kit/RecipesCard";
import { Modal } from "../../shared/ui-kit/Modal";
import { Recipes } from "../../shared/ui-kit/ModalContent/Recipes";

export const RecipeTab = () => {
  const [showModal, setShowModal] = useState(false);

  const { data } = useGetUserRecipesQuery();
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
          return (
            <RecipesCard openRecipe={openRecipe} key={index} spanList={[4, 6, 3]} {...props} profile={"profile"} />
          );
        })}
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          <Recipes {...recipe} />
        </Modal>
      )}
    </>
  );
};
