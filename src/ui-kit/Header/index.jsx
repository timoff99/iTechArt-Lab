import React from "react";
import styled from "styled-components";

import { Container } from "../Container";
import { Col } from "../Grid/Col";
import { ReactComponent as Logo } from "../../static/icons/logo.svg";
import person from "../../static/icons/person.svg";
import { Input } from "../Input";
import { Button } from "../Button";
import { Box } from "../Box";
import theme from "../../theme";

const Ul = styled(Box)`
  display: flex;
  list-style-type: none;

  color: ${theme.colors.secondary.main};
`;

const Li = styled(Box)``;

export const Header = () => {
  return (
    <Box boxShadow="0px 0px 16px rgba(0, 0, 0, 0.08)">
      <Container display="flex" alignItems="center">
        <Logo />
        <Ul as="ul">
          <Li as="li">Recepies</Li>
          <Li as="li">Cookbooks</Li>
        </Ul>
        <Input
          type="text"
          name="smallSearch"
          variantLabel="smallLabel"
          variantInput="smallInput"
          inputSize="sm"
          labelSize="sm"
        />
        <Button size="sm" variant="outlined">
          Create cookBook
        </Button>
        <div>
          <img src={person} alt="person" />
          <span>John Doe</span>
        </div>
      </Container>
    </Box>
  );
};
