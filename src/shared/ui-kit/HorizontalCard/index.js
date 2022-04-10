import React, { useState } from "react";
import { Box } from "../../helpers/Box";
import { Flex, FlexBetween, FlexAlignCenter, FlexCenter } from "../../helpers/Flex";
import { ReactComponent as Eye } from "../../../static/icons/small-eye.svg";
import { ReactComponent as Options } from "../../../static/icons/options.svg";
import { ReactComponent as Heart } from "../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../static/icons/comment.svg";
import { Paragraph, Heading } from "../../helpers/Text";
import { StyledCard, ImgBox, OptionMenu } from "./styles";
import { Button } from "../Button";
import { CreateRecipes } from "../ModalContent/CreateRecipes";
import { Modal } from "../Modal";
import {
  useAddRecipeCloneMutation,
  useDeleteRecipeMutation,
  useUpdateRecipeLikesMutation,
} from "../../../services/recipe.service";
import UserService from "../../../services/user.service";

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
  const [addRecipeClone] = useAddRecipeCloneMutation();
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

  const onDelete = async (event) => {
    event.stopPropagation();
    deleteRecipe({ _id });
    await UserService.deleteUserRecipeId(_id);
    setOptionMenu(false);
  };

  const onClone = async (event) => {
    event.stopPropagation();
    addRecipeClone(_id);
    setOptionMenu(false);
  };

  const handleLikes = (event) => {
    event.stopPropagation();
    updateRecipeLikes({ _id });
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const save = async () => {
    addRecipeClone(_id);
  };

  const OptionUI = () => {
    return (
      <>
        <Paragraph alignSelf="center">{author}</Paragraph>
        {modalCookBook ? (
          <Button variant="outlined" ml={5} onClick={save}>
            Save
          </Button>
        ) : (
          <FlexAlignCenter onClick={handleOption} height={20} position="relative">
            <Options />
            {optionMenu && props.profile && (
              <OptionMenu>
                <Button variant="secondary" variantMenu="secondaryMenu" size="box" onClick={onEdit}>
                  <Paragraph as={"pre"} fontWeight={"normal"}>
                    Edit Recipe
                  </Paragraph>
                </Button>
                <Button variant="secondary" variantMenu="secondaryMenu" size="box" onClick={onDelete}>
                  <Paragraph as={"pre"} fontWeight={"normal"}>
                    Delete Recipe
                  </Paragraph>
                </Button>
              </OptionMenu>
            )}
            {optionMenu && props.search && (
              <OptionMenu>
                <Button variant="secondary" variantMenu="secondaryMenu" size="box" onClick={onClone}>
                  <Paragraph as={"pre"} fontWeight={"normal"}>
                    Clone to My Recipe
                  </Paragraph>
                </Button>
              </OptionMenu>
            )}
          </FlexAlignCenter>
        )}
      </>
    );
  };
  return (
    <StyledCard place={place} mb={3} {...props} onClick={() => openRecipe(_id)} width={"100%"}>
      <FlexBetween flexDirection={["column", "row"]} width={"100%"}>
        <ImgBox image={image} />
        <Flex justifyContent="space-between" flexDirection={"column"} flex={1} p={8}>
          <FlexBetween pb={5}>
            <Heading as={"h3"} semiBold>
              {title}
            </Heading>
          </FlexBetween>
          {description && (
            <Paragraph textAlign="left" pb={[0, 0, 5]} overflow="hidden" height="46px">
              {description}
            </Paragraph>
          )}
          <Box display={["flex", "flex", "none"]} justifyContent="space-between" p={8} alignItems="end">
            {OptionUI()}
          </Box>
          <FlexCenter>
            <Flex flexWrap="wrap" flexGrow="1">
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
          </FlexCenter>
        </Flex>
        <Box
          display={["none", "none", "flex"]}
          justifyContent="space-between"
          flexDirection="column"
          p={8}
          alignItems="end"
        >
          {OptionUI()}
        </Box>
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
