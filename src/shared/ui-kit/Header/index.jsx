import React, { useState } from "react";

import { ReactComponent as Logo } from "../../../static/icons/logo.svg";
import person from "../../../static/icons/person.svg";
import { Input } from "../Input";
import { Button } from "../Button";
import { Box } from "../../helpers/Box";
import { StyledContainer, User } from "./styles";
import { Li, Ul } from "../../helpers/List";
import { LinkRenderer, Paragraph } from "../../helpers/Text";
import { Modal } from "../Modal";

export const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <Box boxShadow="0px 0px 16px rgba(0, 0, 0, 0.08)">
      <StyledContainer>
        {showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal} openModal={openModal}>
            {[1, 2, 3, 4, 5].map((el) => {
              return el;
            })}
          </Modal>
        )}
        <Logo />
        <Ul>
          <Li>
            <LinkRenderer href="/" color="secondary.main" inline>
              Recipes
            </LinkRenderer>
          </Li>
          <Li>
            <LinkRenderer href="/" color="secondary.main" inline>
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
        <User>
          <img src={person} alt="person" />
          <Paragraph fontSize={1} color="secondary.main">
            John Doe
          </Paragraph>
        </User>
      </StyledContainer>
    </Box>
  );
};
