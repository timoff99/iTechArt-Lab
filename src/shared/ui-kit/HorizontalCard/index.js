import React, { useState, useEffect } from "react";

import { Box } from "../../helpers/Box";
import { Flex, FlexBetween, FlexCenter, FlexAlignCenter } from "../../helpers/Flex";
import { ReactComponent as Eye } from "../../../static/icons/small-eye.svg";
import { ReactComponent as Options } from "../../../static/icons/options.svg";
import { ReactComponent as Heart } from "../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../static/icons/comment.svg";
import { Paragraph, Heading } from "../../helpers/Text";
import { StyledCard, Img } from "./styles";
import { Button } from "../Button";

export const HorizontalCard = ({
  title,
  description,
  openRecipe,
  author,
  views,
  likes,
  comments,
  image,
  place,
  steps,
  ingredients,
  modalCookBook,
  _id,
  ...props
}) => {
  const handleOption = (event) => {
    event.preventDefault();
    console.log(2);
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
                <FlexAlignCenter pr={8}>
                  <Heart />
                  <Paragraph ml={2}>{likes?.length ? likes.length : 0} likes</Paragraph>
                </FlexAlignCenter>
                <FlexAlignCenter>
                  <Comment />
                  <Paragraph ml={2}>{comments?.length ? comments.length : 0} comments</Paragraph>
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
            <FlexAlignCenter onClick={(e) => handleOption(e)} height={20} mb={5}>
              <Options />
            </FlexAlignCenter>
          )}
        </FlexBetween>
      </FlexBetween>
    </StyledCard>
  );
};
