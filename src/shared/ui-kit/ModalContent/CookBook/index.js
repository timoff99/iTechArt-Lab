import React from "react";
import styled from "styled-components";

import { ReactComponent as Heart } from "../../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../../static/icons/comment.svg";
import { Box } from "../../../helpers/Box";
import { FlexBetween, FlexColumn, FlexAlignCenter } from "../../../helpers/Flex";
import { Paragraph, Heading } from "../../../helpers/Text";
import { Button } from "../../Button";
import { HorizontalCard } from "../../HorizontalCard";
import { Comments } from "../../Comments";

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

export const CookBook = ({ recipes, title, description, author, likes, comments, image }) => {
  console.log("kek", title);
  return (
    <Box px={56} py={72}>
      <FlexBetween mb={10}>
        <FlexColumn>
          <Heading as={"h2"} bold mb={5} maxWidth={600}>
            {title}
          </Heading>
          <Paragraph color="primary.main" fontSize={2}>
            {author}
          </Paragraph>
        </FlexColumn>
        <Box>
          <Button size="md" variant="primary">
            Clone to My CookBook
          </Button>
        </Box>
      </FlexBetween>
      <FlexBetween mb={12}>
        <BoxImage mr={5}>
          <Image as="img" src={image} alt="image" />
          <FlexAlignCenter pt={9}>
            <FlexAlignCenter mr={8}>
              <Heart />
              <Paragraph ml={2}>{likes?.length} likes</Paragraph>
            </FlexAlignCenter>
            <FlexAlignCenter>
              <Comment />
              <Paragraph ml={2}>{comments?.count} comments</Paragraph>
            </FlexAlignCenter>
          </FlexAlignCenter>
        </BoxImage>
        <FlexColumn maxWidth={424}>
          <Heading as={"h3"} semiBold mb={5}>
            Description
          </Heading>
          <Paragraph>{description}</Paragraph>
        </FlexColumn>
      </FlexBetween>
      <FlexColumn mb={10}>
        <Heading as={"h3"} semiBold mb={10}>
          Recipes
        </Heading>
        {recipes &&
          recipes.map((props, index) => {
            return <HorizontalCard key={index} modalCookBook place={"no-rates"} {...props} />;
          })}
      </FlexColumn>
      <FlexColumn mb={10}>
        <Comments />
      </FlexColumn>
    </Box>
  );
};
