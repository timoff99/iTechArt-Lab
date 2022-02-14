import React, { useState, useEffect, useContext } from "react";

import { ReactComponent as Logo } from "../../../static/icons/logo.svg";
import person from "../../../static/icons/person.svg";
import { Input } from "../Input";
import { Button } from "../Button";
import { Box } from "../../helpers/Box";
import { StyledContainer, User } from "./styles";
import { Li, Ul } from "../../helpers/List";
import { LinkRenderer, Paragraph } from "../../helpers/Text";
import { Modal } from "../Modal";
import { CreateCookBook } from "../ModalContent/CreateCookBook";
import { UserContext } from "../UserProvider";
import UserService from "../../../services/user.service";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigate();
  const TryGetUser = async () => {
    if (!user.username) {
      try {
        const getUser = await UserService.getUser();
        setUser(getUser.data.user);
      } catch (error) {
        navigation("/", { replace: true });
      }
    }
  };
  useEffect(() => {
    TryGetUser();
  }, []);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <Box boxShadow="0px 0px 16px rgba(0, 0, 0, 0.08)">
      <StyledContainer>
        {showModal && (
          <Modal showModal={showModal} setShowModal={openModal}>
            <CreateCookBook />
          </Modal>
        )}
        <LinkRenderer href="/" inline>
          <Logo />
        </LinkRenderer>

        <Ul>
          <Li>
            <LinkRenderer href="/search?tab=recipes" color="secondary.main" inline>
              Recipes
            </LinkRenderer>
          </Li>
          <Li>
            <LinkRenderer href="/search?tab=cookbooks" color="secondary.main" inline>
              Cookbooks
            </LinkRenderer>
          </Li>
        </Ul>
        <Input
          type="text"
          name="smallSearch"
          variantLabel="smallLabel"
          variantInput="smallInput"
          inputSize="sm"
          labelSize="sm"
        />
        <Button size="sm" variant="outlined" onClick={openModal}>
          Create cookBook
        </Button>
        {user.username ? (
          <LinkRenderer href="/profile?tab=cookbooks" color="secondary.main" inline>
            <User>
              <img src={person} alt="person" />
              <Paragraph fontSize={1} color="secondary.main">
                {user.username}
              </Paragraph>
            </User>
          </LinkRenderer>
        ) : (
          <LinkRenderer href="/login" color="secondary.main" inline>
            <Paragraph fontSize={1} color="secondary.main">
              Sign In
            </Paragraph>
          </LinkRenderer>
        )}
      </StyledContainer>
    </Box>
  );
};
