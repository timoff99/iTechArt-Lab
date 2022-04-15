import React, { useContext, useState } from "react";

import { FlexBetween, FlexCenter, FlexAlignCenter, Flex, FlexColumn } from "../../helpers/Flex";
import { ReactComponent as Eye } from "../../../static/icons/small-eye.svg";
import { ReactComponent as Options } from "../../../static/icons/options.svg";
import { ReactComponent as Heart } from "../../../static/icons/heart.svg";
import { ReactComponent as Comment } from "../../../static/icons/comment.svg";
import { Heading, Paragraph } from "../../helpers/Text";
import { StyledCard, ImgBox, OptionMenu } from "./styles";
import { Button } from "../Button";
import {
  useAddCookBookCloneMutation,
  useDeleteCookBookMutation,
  useUpdateCookBookLikesMutation,
} from "../../../services/cookbook.service";
import { Modal } from "../Modal";
import { CreateCookBook } from "../ModalContent/CreateCookBook";
import UserService from "../../../services/user.service";
import { UserContext } from "../UserProvider";

export const Card = ({
  _id,
  title,
  description,
  author,
  views,
  likes,
  comments,
  recipes,
  image,
  types,
  place,
  openRecipe,
  openCookBook,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [optionMenu, setOptionMenu] = useState(false);
  const [deleteCookBook] = useDeleteCookBookMutation();
  const [updateCookBookLikes] = useUpdateCookBookLikesMutation();
  const [addCookBookClone] = useAddCookBookCloneMutation();
  const { user } = useContext(UserContext);
  const handleOption = (event) => {
    event.stopPropagation();
    setOptionMenu((prev) => !prev);
  };

  const onEdit = (event) => {
    event.stopPropagation();
    setUpdate(true);
    toggleModal();
    setOptionMenu(false);
  };

  const onDelete = async (event) => {
    event.stopPropagation();
    deleteCookBook({ _id });
    await UserService.deleteUserCookBookId(_id);
    setOptionMenu(false);
  };

  const onClone = (event) => {
    event.stopPropagation();
    addCookBookClone(_id);
    setOptionMenu(false);
  };

  const handleLikes = (event) => {
    event.stopPropagation();
    updateCookBookLikes({ _id });
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <StyledCard place={place} mb={3} {...props} onClick={() => openCookBook(_id)}>
      <FlexColumn p={8}>
        <FlexAlignCenter pb={5} justifyContent="space-between">
          <FlexAlignCenter>
            <Eye />
            <Paragraph ml={2}>{views} views</Paragraph>
          </FlexAlignCenter>
          <FlexAlignCenter onClick={handleOption} height={20} position="relative">
            <Options />
            {optionMenu && props.profile && (
              <OptionMenu>
                <Button variant="secondary" variantMenu="secondaryMenu" size="box" onClick={onEdit}>
                  <Paragraph as={"pre"} fontWeight={"normal"}>
                    Edit CookBook
                  </Paragraph>
                </Button>
                <Button variant="secondary" variantMenu="secondaryMenu" size="box" onClick={onDelete}>
                  <Paragraph as={"pre"} fontWeight={"normal"}>
                    Delete CookBook
                  </Paragraph>
                </Button>
              </OptionMenu>
            )}
            {optionMenu && props.search && (
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
            <Heart style={{ fill: `${likes?.includes(user._id) ? "red" : "#DADADA"}` }} />
            <Paragraph ml={2}>{likes?.length || 0} likes</Paragraph>
          </FlexAlignCenter>
          <FlexAlignCenter>
            <Comment />
            <Paragraph ml={2}>{comments?.length || 0} comments</Paragraph>
          </FlexAlignCenter>
        </FlexAlignCenter>
      </FlexColumn>
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          {
            <CreateCookBook
              setShowModal={toggleModal}
              _id={_id}
              oldTitle={title}
              oldDescription={description}
              types={types}
              oldRecipes={recipes}
              oldImage={image}
              openRecipe={openRecipe}
              update={update}
              setUpdate={setUpdate}
              {...props}
            />
          }
        </Modal>
      )}
    </StyledCard>
  );
};
