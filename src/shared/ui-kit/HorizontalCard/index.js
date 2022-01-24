import React from "react";

import { Box } from "../../helpers/Box";
import { Flex, FlexBetween, FlexCenter, FlexAlignCenter } from "../../helpers/Flex";
import { ReactComponent as Eye } from "../../../static/icons/small-eye.svg";
import { ReactComponent as Options } from "../../../static/icons/options.svg";
import { ReactComponent as Heart } from "../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../static/icons/comment.svg";
import { LinkRenderer, Paragraph, Heading } from "../../helpers/Text";
import { StyledCard } from "./styles";

export const HorizontalCard = ({ views, recept, author, likes, comments, image, description, place, ...props }) => {
  const handleOption = (event) => {
    event.preventDefault();
    console.log(2);
  };
  return (
    <LinkRenderer href="/" color="secondary.main">
      <StyledCard place={place} mb={3} {...props}>
        <Flex>
          <img src={image} alt="cardImage" />
          <Box p={8}>
            <FlexBetween pb={5}>
              <Heading as={"h3"} semiBold>
                {recept}
              </Heading>
              <Paragraph>{author}</Paragraph>
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
                  <Paragraph ml={2}>{likes} likes</Paragraph>
                </FlexAlignCenter>
                <FlexAlignCenter>
                  <Comment />
                  <Paragraph ml={2}>{comments} comments</Paragraph>
                </FlexAlignCenter>
              </Flex>
              <FlexAlignCenter onClick={(e) => handleOption(e)} height={20}>
                <Options />
              </FlexAlignCenter>
            </FlexBetween>
          </Box>
        </Flex>
      </StyledCard>
    </LinkRenderer>
  );
};
