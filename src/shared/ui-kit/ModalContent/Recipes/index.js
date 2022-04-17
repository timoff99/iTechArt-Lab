import React, { useContext } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import { ReactComponent as Heart } from "../../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../../static/icons/comment.svg";
import { ReactComponent as Eye } from "../../../../static/icons/small-eye.svg";
import { FlexBetween, FlexColumn, FlexAlignCenter, Flex } from "../../../helpers/Flex";
import { Box } from "../../../helpers/Box";
import { Paragraph, Heading } from "../../../helpers/Text";
import { Button } from "../../Button";
import { Comments } from "../../Comments";
import theme, { colors, mediaQueries } from "../../../../theme";
import { Loader } from "../../Loader";

import { useCreateRecipeCommentsMutation } from "../../../../services/comments.service";
import {
  useAddRecipeCloneWithoutTagMutation,
  useUpdateRecipeCommentsMutation,
} from "../../../../services/recipe.service";
import { useAddRecipeCloneMutation } from "../../../../services/recipe.service";
import { UserContext } from "../../UserProvider";

const Image = styled(Box)`
  width: 100%;
  max-height: 660px;
  ${mediaQueries.medium} {
    min-width: 340px;
  }
  ${mediaQueries.large} {
    min-width: 440px;
  }
  border-radius: 10px;
  object-fit: cover;
`;

const Circle = styled(Box)`
  height: 5px;
  width: 5px;
  background-color: ${theme.colors.primary.main};
  border-radius: 50%;
  display: inline-block;
`;

export const Recipes = ({
  _id,
  title,
  description,
  author,
  views,
  likes,
  comments,
  image,
  steps,
  ingredients,
  withoutTag,
}) => {
  const [createRecipeComments] = useCreateRecipeCommentsMutation();
  const [updateRecipeComments] = useUpdateRecipeCommentsMutation();
  const [addRecipeClone] = useAddRecipeCloneMutation();
  const [addRecipeCloneWithoutTag] = useAddRecipeCloneWithoutTagMutation();
  const { user } = useContext(UserContext);

  const successNotify = (msg) => {
    return toast.success(msg);
  };

  const onClone = () => {
    if (withoutTag) {
      addRecipeCloneWithoutTag(_id);
    } else {
      addRecipeClone(_id);
    }
    successNotify("recipe copied to your recipes collection");
  };
  return (
    <Box>
      <Flex flexDirection={["column", "row", "row"]}>
        {image ? (
          <Image
            as="img"
            src={image}
            alt="image"
            alignSelf={["center", "normal", "normal"]}
            maxWidth={["auto", "fit-content"]}
          />
        ) : (
          <Box display="flex" justifyContent="center">
            <Loader color={colors.primary.main} height={"lg"} width={"lg"} />
          </Box>
        )}
        <FlexColumn pl={[5, 40, 40]} pr={[5, 40, 11]} pt={72} flex="1">
          <FlexBetween>
            <Heading as={"h2"} bold mb={5} maxWidth={427}>
              {title}
            </Heading>
            <Box>
              <Button size="box" variant="outlined" onClick={onClone}>
                +
              </Button>
            </Box>
          </FlexBetween>
          <Paragraph color="primary.main" fontSize={2} mb={9}>
            {author}
          </Paragraph>

          <Heading as={"h3"} semiBold mb={5}>
            Description
          </Heading>
          <Paragraph maxWidth="fit-content">{description}</Paragraph>
          <Box mt={8} display={["block", "flex"]} justifyContent="space-between">
            <Box mr={11} mb={[3, 0]} flex={1} maxWidth={["inherit", "300px"]}>
              <Heading as={"h3"} semiBold mb={5}>
                Directions
              </Heading>
              {steps &&
                steps.map((step, i) => (
                  <Box key={i}>
                    <Paragraph bold inline>
                      Step {i + 1}:
                    </Paragraph>
                    <Paragraph inline ml={2}>
                      {step}
                    </Paragraph>
                  </Box>
                ))}
            </Box>
            <Box flex={1} maxWidth={["inherit", "300px"]}>
              <Heading as={"h3"} semiBold mb={5}>
                Ingredients
              </Heading>
              {ingredients &&
                ingredients.map((ingredient, i) => (
                  <FlexAlignCenter key={i}>
                    <Circle />
                    <Paragraph inline ml={2}>
                      {ingredient}
                    </Paragraph>
                  </FlexAlignCenter>
                ))}
            </Box>
          </Box>
          <FlexAlignCenter pt={9} flexWrap="wrap">
            <FlexAlignCenter mr={8}>
              <Eye />
              <Paragraph ml={2}>{views} views</Paragraph>
            </FlexAlignCenter>
            <FlexAlignCenter mr={8}>
              <Heart style={{ fill: `${likes?.includes(user._id) ? "red" : "#DADADA"}` }} />
              <Paragraph ml={2}>{likes?.length || 0} likes</Paragraph>
            </FlexAlignCenter>
            <FlexAlignCenter>
              <Comment />
              <Paragraph ml={2}>{comments?.length || 0} comments</Paragraph>
            </FlexAlignCenter>
          </FlexAlignCenter>
        </FlexColumn>
      </Flex>
      <Box px={[3, 11, 11]} pt={72}>
        <FlexColumn mb={10}>
          <Comments
            id={_id}
            createComments={createRecipeComments}
            comments={comments}
            updateComments={updateRecipeComments}
          />
        </FlexColumn>
      </Box>
    </Box>
  );
};
