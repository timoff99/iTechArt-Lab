import React from "react";

import { ReactComponent as Logo } from "../../static/icons/logo.svg";
import person from "../../static/icons/person.svg";
import { Input } from "../Input";
import { Button } from "../Button";
import { Box } from "../Box";
import { StyledContainer, User } from "./styles";
import { Li, Ul } from "../List";
import { LinkRenderer, Paragraph } from "../Text";

export const Header = () => {
  return (
    <Box boxShadow="0px 0px 16px rgba(0, 0, 0, 0.08)">
      <StyledContainer>
        <Logo />
        <Ul>
          <Li>
            <LinkRenderer href="/" color="secondary.main" inline>
              Recepies
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
        <Button size="sm" variant="outlined">
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
