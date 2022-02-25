import React, { useState, useEffect } from "react";

import { Box } from "../../helpers/Box";
import { Flex, FlexBetween, FlexCenter, FlexAlignCenter } from "../../helpers/Flex";
import { ReactComponent as Eye } from "../../../static/icons/small-eye.svg";
import { ReactComponent as Options } from "../../../static/icons/options.svg";
import { ReactComponent as Heart } from "../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../static/icons/comment.svg";
import { Paragraph, Heading } from "../../helpers/Text";
import { StyledCard, Img, OptionMenu } from "./styles";
import { Button } from "../Button";
import { CreateRecipes } from "../ModalContent/CreateRecipes";
import { Modal } from "../Modal";
import { useDeleteRecipeMutation, useUpdateRecipeLikesMutation } from "../../../services/recipe.service";

export const HorizontalCard = ({
  title,
  description,
  openRecipe,
  author,
  views,
  likes,
  comments,
  image,
  cooking_time,
  place,
  steps,
  ingredients,
  modalCookBook,
  _id,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [optionMenu, setOptionMenu] = useState(false);
  const [deleteRecipe] = useDeleteRecipeMutation();
  const [updateRecipeLikes] = useUpdateRecipeLikesMutation();

  const handleOption = (event) => {
    event.stopPropagation();
    setOptionMenu((prev) => !prev);
  };

  const onEdit = (event) => {
    event.stopPropagation();
    setUpdate(true);
    toggleModal();
    setOptionMenu(false);
  };

  const onDelete = (event) => {
    event.stopPropagation();
    deleteRecipe(_id);
    setOptionMenu(false);
  };

  const onClone = (event) => {
    event.stopPropagation();
    console.log("onClone");
    setOptionMenu(false);
  };

  const handleLikes = (event) => {
    event.stopPropagation();
    console.log("handleLikes");
    updateRecipeLikes(_id);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const foo = (e) => {
    e.stopPropagation();
    console.log("vover");
  };

  const boo = (e) => {
    e.stopPropagation();
    console.log("bober");
  };

  return (
    <StyledCard place={place} mb={3} {...props} onClick={() => openRecipe(_id)} width={"100%"}>
      <FlexBetween width={"100%"}>
        <Flex>
          <Img as="img" src={image} alt="cardImage" />
          <Box p={8}>
            <FlexBetween pb={5}>
              <Heading as={"h3"} semiBold>
                {title}
              </Heading>
            </FlexBetween>
            {description && (
              <Paragraph textAlign="left" pb={48}>
                {description}
              </Paragraph>
            )}
            <FlexBetween>
              <Flex flexWrap="wrap">
                <FlexAlignCenter pr={8}>
                  <Eye />
                  <Paragraph ml={2}>{views} views</Paragraph>
                </FlexAlignCenter>
                <FlexAlignCenter pr={8} onClick={handleLikes}>
                  <Heart />
                  <Paragraph ml={2}>{likes?.length || 0} likes</Paragraph>
                </FlexAlignCenter>
                <FlexAlignCenter>
                  <Comment />
                  <Paragraph ml={2}>{comments?.length || 0} comments</Paragraph>
                </FlexAlignCenter>
              </Flex>
            </FlexBetween>
          </Box>
        </Flex>
        <FlexBetween flexDirection="column" p={8} alignItems="end">
          <Paragraph>{author}</Paragraph>
          {modalCookBook ? (
            <Button variant="outlined" ml={5} onClick={(e) => foo(e)}>
              Save
            </Button>
          ) : (
            <FlexAlignCenter onClick={(e) => handleOption(e)} height={20} mb={5} position="relative">
              <Options />
              {optionMenu && props.profile && (
                <OptionMenu>
                  <Button variant="secondary" variantMenu="secondaryMenu" size="box" onClick={onEdit}>
                    <Paragraph as={"pre"} fontWeight={"normal"}>
                      Edit CookBook
                    </Paragraph>
                  </Button>
                  <Button variant="secondary" variantMenu="secondaryMenu" size="box" onClick={onDelete}>
                    <Paragraph as={"pre"} fontWeight={"normal"}>
                      Delete CookBook
                    </Paragraph>
                  </Button>
                </OptionMenu>
              )}
              {optionMenu && props.search && (
                <OptionMenu>
                  <Button variant="secondary" variantMenu="secondaryMenu" size="box" onClick={onClone}>
                    <Paragraph as={"pre"} fontWeight={"normal"}>
                      Clone to My CookBooks
                    </Paragraph>
                  </Button>
                </OptionMenu>
              )}
            </FlexAlignCenter>
          )}
        </FlexBetween>
      </FlexBetween>
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          {
            <CreateRecipes
              setShowModal={toggleModal}
              _id={_id}
              oldTitle={title}
              oldDescription={description}
              oldCooking_time={cooking_time}
              oldSteps={steps}
              oldIngredients={ingredients}
              oldImage={image}
              update={update}
              setUpdate={setUpdate}
              {...props}
            />
          }
        </Modal>
      )}
    </StyledCard>
  );
};
