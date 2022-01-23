import React from "react";

import { Box } from "../../helpers/Box";
import { Flex, FlexBetween, FlexCenter, FlexAlignCenter } from "../../helpers/Flex";
import { ReactComponent as Eye } from "../../../static/icons/small-eye.svg";
import { ReactComponent as Options } from "../../../static/icons/options.svg";
import { ReactComponent as Heart } from "../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../static/icons/comment.svg";
import { LinkRenderer, Paragraph } from "../../helpers/Text";
import { StyledHeading, StyledCard, StyledImg } from "./styles";

export const Card = ({ views, recept, author, likes, comments, image, description, place, ...props }) => {
  return (
    <StyledCard place={place} mb={3} {...props}>
      <Box p={8}>
        <FlexAlignCenter pb={5} justifyContent="space-between">
          <FlexAlignCenter>
            <Eye />
            <Paragraph ml={2}>{views} views</Paragraph>
          </FlexAlignCenter>
          <Flex>
            <Options onClick={() => console.log(2)} />
          </Flex>
        </FlexAlignCenter>
        <LinkRenderer href="/" color="secondary.main">
          <FlexCenter>
            <StyledImg src={image} alt="cardImage" />
          </FlexCenter>
        </LinkRenderer>

        <FlexBetween pt={5} alignItems="center">
          <StyledHeading as={"h3"} semiBold>
            {recept}
          </StyledHeading>
          <Paragraph>{author}</Paragraph>
        </FlexBetween>

        {description && (
          <Paragraph pt={5} textAlign="left">
            {description}
          </Paragraph>
        )}
        {likes && comments && (
          <FlexAlignCenter pt={9} justifyContent="space-between">
            <FlexAlignCenter>
              <Heart />
              <Paragraph ml={2}>{likes} likes</Paragraph>
            </FlexAlignCenter>
            <FlexAlignCenter>
              <Comment />
              <Paragraph ml={2}>{comments} comments</Paragraph>
            </FlexAlignCenter>
          </FlexAlignCenter>
        )}
      </Box>
    </StyledCard>
  );
};
