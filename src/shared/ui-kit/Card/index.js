import React from "react";

import { Box } from "../../helpers/Box";
import { FlexBetween, FlexCenter, FlexAlignCenter } from "../../helpers/Flex";
import { ReactComponent as Eye } from "../../../static/icons/small-eye.svg";
import { ReactComponent as Options } from "../../../static/icons/options.svg";
import { ReactComponent as Heart } from "../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../static/icons/comment.svg";
import { Paragraph } from "../../helpers/Text";
import { StyledHeading, StyledCard, StyledImg } from "./styles";

export const Card = ({
  title,
  description,
  openCookBook,
  author,
  views,
  likes,
  comments,
  image,
  place,
  cloudinary_id,
  recipes,
  _id,
  ...props
}) => {
  const handleOption = (event) => {
    event.preventDefault();
    console.log(2);
  };

  return (
    <StyledCard place={place} mb={3} {...props} onClick={() => openCookBook(_id)}>
      <Box p={8}>
        <FlexAlignCenter pb={5} justifyContent="space-between">
          <FlexAlignCenter>
            <Eye />
            <Paragraph ml={2}>{views} views</Paragraph>
          </FlexAlignCenter>
          <FlexAlignCenter onClick={(e) => handleOption(e)} height={20}>
            <Options />
          </FlexAlignCenter>
        </FlexAlignCenter>
        <FlexCenter>
          <StyledImg src={image} alt="cardImage" />
        </FlexCenter>

        <FlexBetween pt={5} alignItems="center">
          <StyledHeading as={"h3"} semiBold>
            {title}
          </StyledHeading>
          <Paragraph>{author}</Paragraph>
        </FlexBetween>

        {description && (
          <Paragraph pt={5} textAlign="left">
            {description}
          </Paragraph>
        )}

        <FlexAlignCenter pt={9} justifyContent="space-between">
          <FlexAlignCenter>
            <Heart />
            <Paragraph ml={2}>{likes?.length || 0} likes</Paragraph>
          </FlexAlignCenter>
          <FlexAlignCenter>
            <Comment />
            <Paragraph ml={2}>{comments?.length || 0} comments</Paragraph>
          </FlexAlignCenter>
        </FlexAlignCenter>
      </Box>
    </StyledCard>
  );
};
