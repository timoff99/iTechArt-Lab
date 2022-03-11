import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as Heart } from "../../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../../static/icons/comment.svg";
import { Box } from "../../../helpers/Box";
import { FlexBetween, FlexColumn, FlexAlignCenter, Flex } from "../../../helpers/Flex";
import { Paragraph, Heading } from "../../../helpers/Text";
import { Button } from "../../Button";
import { HorizontalCard } from "../../HorizontalCard";
import { Comments } from "../../Comments";
import { Recipes } from "../Recipes";
import { Modal } from "../../Modal";
import { useLazyGetRecipeQuery } from "../../../../services/recipe.service";
import { useCreateCookBookCommentsMutation } from "../../../../services/comments.service";
import { useAddCookBookCloneMutation, useUpdateCookBookCommentsMutation } from "../../../../services/cookbook.service";

const BoxImage = styled(Box)`
  width: 100%;
`;

const Image = styled(Box)`
  border-radius: 50px 10px;
  max-height: 240px;
  width: 100%;
  max-width: 440px;
  object-fit: cover;
`;

export const CookBook = ({ _id, recipes, title, description, author, likes, comments, image }) => {
  const [showModal, setShowModal] = useState(false);
  const [createCookBookComments] = useCreateCookBookCommentsMutation();
  const [updateCookBookComments] = useUpdateCookBookCommentsMutation();
  const [action, { data: recipe }] = useLazyGetRecipeQuery();
  const [addCookBookClone] = useAddCookBookCloneMutation();
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const openRecipe = (_id) => {
    action(_id, true);
    toggleModal();
  };
  const onClone = async (_id) => {
    addCookBookClone(_id);
  };

  return (
    <Box px={[5, 11, 11]} pt={[5, 12, 12]}>
      <FlexBetween mb={10} flexWrap={"wrap"}>
        <FlexColumn mb={[5, 0, 0]}>
          <Heading as={"h2"} bold mb={5} maxWidth={600}>
            {title}
          </Heading>
          <Paragraph color="primary.main" fontSize={2}>
            {author}
          </Paragraph>
        </FlexColumn>
        <Box>
          <Button size="md" variant="primary" onClick={() => onClone(_id)}>
            Clone to My CookBook
          </Button>
        </Box>
      </FlexBetween>
      <FlexBetween mb={12} flexWrap={["wrap", "nowrap", "nowrap"]}>
        <BoxImage mr={5}>
          <Image as="img" src={image} alt="image" />
          <FlexAlignCenter pt={9}>
            <FlexAlignCenter mr={8}>
              <Heart />
              <Paragraph ml={2}>{likes?.length || 0} likes</Paragraph>
            </FlexAlignCenter>
            <FlexAlignCenter>
              <Comment />
              <Paragraph ml={2}>{comments?.length || 0} comments</Paragraph>
            </FlexAlignCenter>
          </FlexAlignCenter>
        </BoxImage>
        <FlexColumn maxWidth={424} mt={[5, 0, 0]}>
          <Heading as={"h3"} semiBold mb={5}>
            Description
          </Heading>
          <Paragraph>{description}</Paragraph>
        </FlexColumn>
      </FlexBetween>
      {recipes?.length > 0 && (
        <>
          <FlexColumn mb={10}>
            <Heading as={"h3"} semiBold mb={10}>
              Recipes
            </Heading>
            {recipes.map((props, index) => {
              return <HorizontalCard openRecipe={openRecipe} key={index} modalCookBook place={"no-rates"} {...props} />;
            })}
          </FlexColumn>
        </>
      )}
      <FlexColumn mb={10}>
        <Comments
          id={_id}
          createComments={createCookBookComments}
          comments={comments}
          updateComments={updateCookBookComments}
        />
      </FlexColumn>
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          <Recipes {...recipe} />
        </Modal>
      )}
    </Box>
  );
};
