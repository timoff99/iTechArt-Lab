import React, { useContext, useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";

import { ReactComponent as Heart } from "../../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../../static/icons/comment.svg";
import { Box } from "../../../helpers/Box";
import { FlexColumn, FlexAlignCenter, Flex } from "../../../helpers/Flex";
import { Paragraph, Heading } from "../../../helpers/Text";
import { Button } from "../../Button";
import { HorizontalCard } from "../../HorizontalCard";
import { Comments } from "../../Comments";
import { Recipes } from "../Recipes";
import { Modal } from "../../Modal";

import { useLazyGetRecipeQuery } from "../../../../services/recipe.service";
import { useCreateCookBookCommentsMutation } from "../../../../services/comments.service";
import { useAddCookBookCloneMutation, useUpdateCookBookCommentsMutation } from "../../../../services/cookbook.service";
import { Col } from "../../../helpers/Grid/Col";
import { Loader } from "../../Loader";
import { colors } from "../../../../theme";
import { UserContext } from "../../UserProvider";

const Image = styled(Box)`
  border-radius: 50px 10px;
  max-height: 300px;
  max-width: 500px;
  width: 100%;
  object-fit: cover;
`;

export const CookBook = ({ _id, recipes, title, description, author, likes, comments, image }) => {
  const [showModal, setShowModal] = useState(false);
  const [createCookBookComments] = useCreateCookBookCommentsMutation();
  const [updateCookBookComments] = useUpdateCookBookCommentsMutation();
  const [action, { data: recipe }] = useLazyGetRecipeQuery();
  const [addCookBookClone] = useAddCookBookCloneMutation();
  const { user } = useContext(UserContext);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const openRecipe = (_id) => {
    action({ _id }, true);
    toggleModal();
  };

  const successNotify = (msg) => {
    return toast.success(msg);
  };

  const onClone = async () => {
    addCookBookClone(_id);
    successNotify("cookbook copied to your cookbooks collection");
  };

  return (
    <Box px={[5, 11, 11]} pt={[10, 12, 12]}>
      <Flex
        mb={10}
        flexWrap={"wrap"}
        flexDirection={["column", "row", "row"]}
        justifyContent={["center", "space-between", "space-between"]}
        alignItems={["center", "stretch", "stretch"]}
      >
        <FlexColumn mb={[5, 0, 0]} alignItems={["center", "stretch", "stretch"]}>
          <Heading as={"h2"} bold mb={5} maxWidth={600}>
            {title}
          </Heading>
          <Paragraph color="primary.main" fontSize={2}>
            {author}
          </Paragraph>
        </FlexColumn>
        <Box>
          <Button size="md" variant="primary" onClick={onClone}>
            Clone to My CookBook
          </Button>
        </Box>
      </Flex>
      <Flex mb={12} flexWrap={["wrap", "nowrap", "nowrap"]} justifyContent={["center", "stretch", "stretch"]}>
        <Box mr={[0, 9, 9]}>
          {image ? (
            <Image as="img" src={image} alt="image" />
          ) : (
            <Box display="flex" justifyContent="center">
              <Loader color={colors.primary.main} height={"lg"} width={"lg"} />
            </Box>
          )}

          <FlexAlignCenter pt={9} justifyContent={["center", "stretch", "stretch"]}>
            <FlexAlignCenter mr={8}>
              <Heart style={{ fill: `${likes?.includes(user._id) ? "red" : "#DADADA"}` }} />
              <Paragraph ml={2}>{likes?.length || 0} likes</Paragraph>
            </FlexAlignCenter>
            <FlexAlignCenter>
              <Comment />
              <Paragraph ml={2}>{comments?.length || 0} comments</Paragraph>
            </FlexAlignCenter>
          </FlexAlignCenter>
        </Box>
        <FlexColumn maxWidth={424} mt={[5, 0, 0]}>
          <Heading as={"h3"} semiBold mb={5}>
            Description
          </Heading>
          <Paragraph maxWidth={["inherit", "350px", "inherit"]}>{description}</Paragraph>
        </FlexColumn>
      </Flex>
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
      <ToastContainer theme="colored" />
    </Box>
  );
};
