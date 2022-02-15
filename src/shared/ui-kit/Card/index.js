import React, { useState, useEffect } from "react";

import { Box } from "../../helpers/Box";
import { Flex, FlexBetween, FlexCenter, FlexAlignCenter } from "../../helpers/Flex";
import { ReactComponent as Eye } from "../../../static/icons/small-eye.svg";
import { ReactComponent as Options } from "../../../static/icons/options.svg";
import { ReactComponent as Heart } from "../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../static/icons/comment.svg";
import { Paragraph } from "../../helpers/Text";
import { StyledHeading, StyledCard, StyledImg } from "./styles";
import { CookBook } from "../../ui-kit/ModalContent/CookBook";
import { Modal } from "../../ui-kit/Modal";
import CookBookService from "../../../services/cookbook.service";

export const Card = ({
  title,
  description,
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
  console.log(likes?.length);
  const [showModal, setShowModal] = useState(false);
  const [currentCookBook, setCurrentCookBook] = useState([]);
  const handleOption = (event) => {
    event.preventDefault();
    console.log(2);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const openCookBook = async () => {
    const updateViews = await CookBookService.updateCookBookViews(_id).then((res) => res.data);
    console.log(updateViews);
    const cookbook = await CookBookService.getCookBook(_id).then((res) => res.data);
    await setCurrentCookBook(cookbook);
    toggleModal();
  };

  return (
    <StyledCard place={place} mb={3} {...props} onClick={openCookBook}>
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
        {likes?.length && comments.count && (
          <FlexAlignCenter pt={9} justifyContent="space-between">
            <FlexAlignCenter>
              <Heart />
              <Paragraph ml={2}>{likes?.length} likes</Paragraph>
            </FlexAlignCenter>
            <FlexAlignCenter>
              <Comment />
              <Paragraph ml={2}>{comments.count} comments</Paragraph>
            </FlexAlignCenter>
          </FlexAlignCenter>
        )}
      </Box>
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          <CookBook {...currentCookBook} />
        </Modal>
      )}
    </StyledCard>
  );
};
