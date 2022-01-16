import React from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../../static/icons/logo.svg";
import { Box } from "../Box";
import { Button } from "../Button";
import { Input } from "../Input";
import theme from "../../theme";

const StyledForm = styled(Box)`
  background: ${theme.colors.background.main};
  width: 600px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 15%);
  margin: 100px;
  border-radius: 40px 10px;
  padding: 50px;
`;

const StyledH3 = styled(Box)`
  font-family: ${theme.fonts.montserrat};
  font-weight: bold;
  font-size: ${theme.fontSizes[3]};
  color: ${theme.colors.secondary.main};
`;

const StyledP = styled(Box)`
  font-weight: 600;
`;

const StyledSpan = styled(StyledP)`
  color: ${theme.colors.primary.main};
  cursor: pointer;
`;
export const Form = ({
  title,
  description,
  link,
  inputData,
  buttonText,
  ...props
}) => {
  return (
    <StyledForm {...props}>
      <Logo />
      <StyledH3 mt="42px">{title}</StyledH3>
      <StyledP as="p" mb="40px">
        {description}{" "}
        <StyledSpan as="span" onClick={() => console.log(1)}>
          {link}
        </StyledSpan>
      </StyledP>
      {inputData.map((props) => {
        return <Input {...props} />;
      })}

      <Button size="fit">{buttonText}</Button>
    </StyledForm>
  );
};
