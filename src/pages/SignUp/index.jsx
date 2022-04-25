import React from "react";
import styled from "styled-components";
import * as yup from "yup";

import { Box } from "../../shared/helpers/Box";
import { Form } from "../../shared/ui-kit/Form";
import signUpBg from "../../static/images/signupBg.png";
import { signUpData } from "./mockData";
import { Grid } from "../../shared/helpers/Grid";
import { Container } from "../../shared/helpers/Container";
import { Col } from "../../shared/helpers/Grid/Col";
import { mediaQueries } from "../../theme";

const StyledLogin = styled(Box)`
  display: flex;
  background: url(${signUpBg}) no-repeat left;
  background-size: cover;
  border-radius: 40px 10px;
  justify-content: flex-end;
  position: absolute;
  height: calc(100% - 32px);
  top: 16px;
  width: 100%;
  z-index: -1;
  ${mediaQueries.small} {
    left: 0;
    top: 0;
    height: 100%;
    border-radius: 0;
    background-size: inherit;
  }
  ${mediaQueries.medium} {
    left: 0;
  }
  ${mediaQueries.large} {
    left: -6vw;
  }
  @media (min-width: 1600px) {
    left: -10vw;
  }
`;

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .trim()
    .required("Please enter your password")
    .matches(/^.*(?=.{5,})(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d)(?=.*[a-z,A-Z])/, "Incorrect, read down below"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

export const SignUp = () => {
  return (
    <Container position="relative">
      <StyledLogin />
      <Grid nested minHeight="100vh" alignItems="center">
        <Col offset={[0, 1, 6]} span={[4, 10, 6]}>
          <Form
            my={5}
            title="Join Our Community"
            description="Already have an account?"
            link="Sign In"
            inputData={signUpData}
            buttonText="Sign Up"
            href="/login"
            auth="signup"
            schema={signupSchema}
          />
        </Col>
      </Grid>
    </Container>
  );
};
