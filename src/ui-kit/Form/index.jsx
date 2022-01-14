import React from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../../static/icons/logo.svg";
import { Box } from "../Box";
import { Button } from "../Button";
import { Input } from "../Input";
import { ReactComponent as Send } from "../../static/icons/send.svg";

const StyledSend = styled(Send)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledForm = styled(Box)`
  background: #cfc7c7;
  width: 600px;
  height: 654px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 15%);
  margin: 100px;
  border-radius: 40px 10px;
  padding: 50px;
`;

export const Form = ({ title, description, inputData, buttonText }) => {
  return (
    <StyledForm>
      <Logo />
      <h3>{title}</h3>
      <p>{description}</p>
      {inputData.map((props) => {
        return <Input {...props} />;
      })}

      <Button>{buttonText}</Button>
    </StyledForm>
  );
};
