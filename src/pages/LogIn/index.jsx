import React from "react";
import styled from "styled-components";
import { Box } from "../../ui-kit/Box";

import { Form } from "../../ui-kit/Form";
import loginBg from "../../static/images/loginBg.png";
import { loginData } from "./mockData";
import { Grid } from "../../ui-kit/Grid";
import { Container } from "../../ui-kit/Container";
import { Col } from "../../ui-kit/Grid/Col";
import { mediaQueries } from "../../theme";

const StyledLogin = styled(Box)`
  display: flex;
  background: url(${loginBg}) no-repeat right;
  background-size: cover;
  border-radius: 40px 10px;
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

export const LogIn = () => {
  return (
    <Container position="relative">
      <StyledLogin />
      <Grid nested minHeight="100vh" alignItems="center">
        <Col offset={[0, 1, 6]} span={[4, 10, 6]}>
          <Form
            my={5}
            title="Welcome back"
            description="New here?"
            link="Create an account"
            inputData={loginData}
            buttonText="Sign In"
          />
        </Col>
      </Grid>
    </Container>
  );
};
