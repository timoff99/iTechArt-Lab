import React from "react";

import { Box } from "../../helpers/Box";
import { Flex, FlexBetween, FlexCenter, FlexAlignCenter } from "../../helpers/Flex";
import { ReactComponent as Eye } from "../../../static/icons/small-eye.svg";
import { ReactComponent as Options } from "../../../static/icons/options.svg";
import { ReactComponent as Heart } from "../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../static/icons/comment.svg";
import { LinkRenderer, Paragraph } from "../../helpers/Text";
import { StyledHeading, StyledCard } from "./styles";

export const HorizontalCard = ({ views, recept, author, likes, comments, image, description, place, ...props }) => {
  return (
    <StyledCard place={place} mb={3} {...props}>
      <Flex>
        <LinkRenderer href="/" color="secondary.main" minimalWidth>
          <Box>
            <img src={image} alt="cardImage" />
          </Box>
        </LinkRenderer>
        <Box p={8} bg="pink">
          <FlexBetween>
            <StyledHeading as={"h3"} semiBold>
              {recept}
            </StyledHeading>
            <Paragraph>{author}</Paragraph>
          </FlexBetween>
          {description && <Paragraph textAlign="left">{description}</Paragraph>}
          <FlexBetween>
            <Flex flexWrap="wrap">
              <FlexAlignCenter>
                <Eye />
                <Paragraph ml={2}>{views} views</Paragraph>
              </FlexAlignCenter>
              <FlexAlignCenter>
                <Heart />
                <Paragraph ml={2}>{likes} likes</Paragraph>
              </FlexAlignCenter>
              <FlexAlignCenter>
                <Comment />
                <Paragraph ml={2}>{comments} comments</Paragraph>
              </FlexAlignCenter>
            </Flex>
            <Flex>
              <Options onClick={() => console.log(2)} />
            </Flex>
          </FlexBetween>
        </Box>
      </Flex>
    </StyledCard>
  );
};
