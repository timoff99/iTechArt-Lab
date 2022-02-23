import React from "react";
import styled from "styled-components";

import { ReactComponent as Heart } from "../../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../../static/icons/comment.svg";
import { ReactComponent as Eye } from "../../../../static/icons/small-eye.svg";
import { Box } from "../../../helpers/Box";
import { FlexBetween, FlexColumn, FlexAlignCenter } from "../../../helpers/Flex";
import { Paragraph, Heading } from "../../../helpers/Text";
import { Button } from "../../Button";
import { Comments } from "../../Comments";
import theme from "../../../../theme";

const Image = styled(Box)`
  width: 100%;
  max-height: 660px;
  max-width: 440px;
  border-radius: 50px 0px 10px;
  object-fit: cover;
`;

const Circle = styled(Box)`
  height: 5px;
  width: 5px;
  background-color: ${theme.colors.primary.main};
  border-radius: 50%;
  display: inline-block;
`;

export const Recipes = ({ title, description, author, views, likes, comments, image, steps, ingredients }) => {
  console.log("lol", title);
  return (
    <Box>
      <FlexBetween>
        <Image as="img" src={image} alt="image" />
        <FlexColumn pl={40} pr={56} pt={72}>
          <FlexBetween>
            <Heading as={"h2"} bold mb={5} maxWidth={427}>
              {title}
            </Heading>
            <Box>
              <Button size="box" variant="outlined">
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
          <Paragraph>{description}</Paragraph>
          <FlexBetween mt={8}>
            <Box mr={11}>
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
            <Box>
              <Heading as={"h3"} semiBold mb={5}>
                Ingredients
              </Heading>
              {ingredients &&
                ingredients.map((ingredient, i) => (
                  <Box key={i}>
                    <Circle />
                    <Paragraph inline ml={2}>
                      {ingredient}
                    </Paragraph>
                  </Box>
                ))}
            </Box>
          </FlexBetween>
          <FlexAlignCenter pt={9}>
            <FlexAlignCenter mr={8}>
              <Eye />
              <Paragraph ml={2}>{views} views</Paragraph>
            </FlexAlignCenter>
            <FlexAlignCenter mr={8}>
              <Heart />
              <Paragraph ml={2}>{likes?.length} likes</Paragraph>
            </FlexAlignCenter>
            <FlexAlignCenter>
              <Comment />
              <Paragraph ml={2}>{comments?.count} comments</Paragraph>
            </FlexAlignCenter>
          </FlexAlignCenter>
        </FlexColumn>
      </FlexBetween>
      <Box px={56} py={72}>
        <FlexColumn mb={10}>
          <Comments />
        </FlexColumn>
      </Box>
    </Box>
  );
};
