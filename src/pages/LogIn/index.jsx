import React from "react";
import styled from "styled-components";
import { Box } from "../../ui-kit/Box";

import { Form } from "../../ui-kit/Form";
import loginBg from "../../static/images/loginBg.png";
import { loginData } from "./mockData";

const StyledLogin = styled(Box)`
  display: flex;
  background: url(${loginBg}) no-repeat right;
  background-size: 66% 100%;
  border-radius: 40px 10px;
  margin: 32px;
`;

export const LogIn = () => {
  return (
    <StyledLogin>
      <Form
        title="Welcome back"
        description="New here?"
        link="Create an account"
        inputData={loginData}
        buttonText="Sign In"
        height={654}
      />
    </StyledLogin>
  );
};
