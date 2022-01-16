import React from "react";
import styled from "styled-components";
import { Box } from "../../ui-kit/Box";

import { Form } from "../../ui-kit/Form";
import signUpBg from "../../static/images/signupBg.png";
import { signUpData } from "./mockData";

const StyledLogin = styled(Box)`
  display: flex;
  background: url(${signUpBg}) no-repeat left;
  background-size: 66% 100%;
  border-radius: 40px 10px;
  margin: 32px;
  justify-content: flex-end;
`;

export const SignUp = () => {
  return (
    <StyledLogin>
      <Form
        title="Join Our Community"
        description="Already have an account?"
        link="Sign In"
        inputData={signUpData}
        buttonText="Sign Up"
      />
    </StyledLogin>
  );
};
