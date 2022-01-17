import React from "react";
import styled from "styled-components";
import { Box } from "../../ui-kit/Box";

import { Form } from "../../ui-kit/Form";
import signUpBg from "../../static/images/signupBg.png";
import { signUpData } from "./mockData";
import { Grid } from "../../ui-kit/Grid";
import { Container } from "../../ui-kit/Container";
import { Col } from "../../ui-kit/Grid/Col";
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
  ${mediaQueries.medium} {
    left: 0;
  }
  ${mediaQueries.large} {
    left: -200px;
  }
`;

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
          />
        </Col>
      </Grid>
    </Container>
  );
};
