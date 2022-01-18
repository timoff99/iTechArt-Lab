import React from "react";

import { Box } from "../Box";
import { ReactComponent as Eye } from "../../static/icons/small-eye.svg";
import { ReactComponent as Options } from "../../static/icons/options.svg";
import { ReactComponent as Heart } from "../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../static/icons/comment.svg";
import { Paragraph } from "../../ui-kit/Text";
import { StyledHeading, StyledCard, Flex } from "./styles";

export const Card = ({ views, recept, author, likes, comments, image, ...props }) => {
  return (
    <StyledCard {...props}>
      <Box p={8} mb={3}>
        <Flex pb={5} justifyContent="space-between">
          <Flex>
            <Eye />
            <Paragraph ml="8px">{views} views</Paragraph>
          </Flex>
          <Options />
        </Flex>
        <Flex justifyContent="center">
          <img src={image} alt="cardImage" />
        </Flex>

        <Flex pt={5} pb={9} justifyContent="space-between">
          <StyledHeading as={"h3"} semiBold>
            {recept}
          </StyledHeading>
          <Paragraph>{author}</Paragraph>
        </Flex>
        <Flex pb={8} justifyContent="space-between">
          <Flex>
            <Heart />
            <Paragraph ml="8px">{likes} likes</Paragraph>
          </Flex>
          <Flex>
            <Comment />
            <Paragraph ml="8px">{comments} comments</Paragraph>
          </Flex>
        </Flex>
      </Box>
    </StyledCard>
  );
};
