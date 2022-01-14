import React from "react";
import styled from "styled-components";
import { Box } from "../../ui-kit/Box";

import { Button } from "../../ui-kit/Button";
import { Form } from "../../ui-kit/Form";
import { Input } from "../../ui-kit/Input";
import loginBg from "../../static/images/loginBg.png";
import { loginData, signUpData } from "./mockData";

const StyledLogin = styled(Box)`
  display: flex;
  background: url(${loginBg}) no-repeat right;
`;

export const LogIn = () => {
  return (
    <>
      <Form
        title="Welcome back"
        description="New here? Create an account"
        inputData={loginData}
        buttonText="Sign In"
      />
      <Form
        title="Join Our Community"
        description="Already have an account? Sign In"
        inputData={signUpData}
        buttonText="Sign Up"
      />
    </>
  );
};
