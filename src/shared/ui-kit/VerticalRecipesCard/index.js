import React, { useState } from "react";

import { Box } from "../../helpers/Box";
import { FlexBetween, FlexCenter, FlexAlignCenter, Flex, FlexColumn } from "../../helpers/Flex";
import { ReactComponent as Eye } from "../../../static/icons/small-eye.svg";
import { ReactComponent as Options } from "../../../static/icons/options.svg";
import { ReactComponent as Heart } from "../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../static/icons/comment.svg";
import { Paragraph, Heading } from "../../helpers/Text";
import { StyledCard, OptionMenu, ImgBox } from "./styles";
import { Button } from "../Button";
import { useAddRecipeCloneMutation, useUpdateRecipeLikesMutation } from "../../../services/recipe.service";

export const VerticalRecipesCard = ({
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
  const [optionMenu, setOptionMenu] = useState(false);
  const [updateRecipeLikes] = useUpdateRecipeLikesMutation();
  const [addCookBookClone] = useAddRecipeCloneMutation();

  const handleOption = (event) => {
    event.stopPropagation();
    setOptionMenu((prev) => !prev);
  };

  const onClone = (event) => {
    event.stopPropagation();
    addCookBookClone(_id);
    setOptionMenu(false);
  };

  const handleLikes = (event) => {
    event.stopPropagation();
    updateRecipeLikes(_id);
  };

  return (
    <StyledCard place={place} mb={3} {...props} onClick={() => openRecipe(_id)}>
      <FlexColumn p={8}>
        <FlexAlignCenter pb={5} justifyContent="space-between">
          <FlexAlignCenter>
            <Eye />
            <Paragraph ml={2}>{views} views</Paragraph>
          </FlexAlignCenter>
          <FlexAlignCenter onClick={(e) => handleOption(e)} height={20} position="relative">
            <Options />
            {optionMenu && (
              <OptionMenu>
                <Button variant="secondary" variantMenu="secondaryMenu" size="box" onClick={onClone}>
                  <Paragraph as={"pre"} fontWeight={"normal"}>
                    Clone to My CookBooks
                  </Paragraph>
                </Button>
              </OptionMenu>
            )}
          </FlexAlignCenter>
        </FlexAlignCenter>
        <FlexCenter>
          <ImgBox image={image} />
        </FlexCenter>

        <FlexBetween pt={5} alignItems="center">
          <Heading as={"h3"} semiBold overflow="hidden" height="20px">
            {title}
          </Heading>
          <Paragraph>{author}</Paragraph>
        </FlexBetween>

        {description && (
          <Paragraph pt={5} textAlign="left">
            {description}
          </Paragraph>
        )}

        <FlexAlignCenter pt={9} justifyContent="space-between" mt="auto">
          <FlexAlignCenter onClick={handleLikes}>
            <Heart />
            <Paragraph ml={2}>{likes?.length || 0} likes</Paragraph>
          </FlexAlignCenter>
          <FlexAlignCenter>
            <Comment />
            <Paragraph ml={2}>{comments?.length || 0} comments</Paragraph>
          </FlexAlignCenter>
        </FlexAlignCenter>
      </FlexColumn>
    </StyledCard>
  );
};
