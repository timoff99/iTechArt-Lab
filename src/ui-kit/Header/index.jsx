import React from "react";
import styled from "styled-components";

import { Container } from "../Container";
import { ReactComponent as Logo } from "../../static/icons/logo.svg";
import person from "../../static/icons/person.svg";
import { Input } from "../Input";
import { Button } from "../Button";
import { Box } from "../Box";
import theme from "../../theme";

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 17px auto;
`;

const Ul = styled(Box)`
  display: flex;
  list-style-type: none;

  color: ${theme.colors.secondary.main};
`;

const Li = styled(Box)`
  margin-right: 72px;
  &:last-child {
    margin-right: 0px;
  }
`;

const User = styled(Box)`
  display: flex;
  align-items: center;
`;

export const Header = () => {
  return (
    <Box boxShadow="0px 0px 16px rgba(0, 0, 0, 0.08)">
      <StyledContainer>
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
        <User>
          <img src={person} alt="person" />
          <span>John Doe</span>
        </User>
      </StyledContainer>
    </Box>
  );
};
