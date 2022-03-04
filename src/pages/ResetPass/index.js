import React from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import { Box } from "../../shared/helpers/Box";
import { Form } from "../../shared/ui-kit/Form";
import loginBg from "../../static/images/loginBg.png";
import { inputData } from "./mockData";
import { Grid } from "../../shared/helpers/Grid";
import { Container } from "../../shared/helpers/Container";
import { Col } from "../../shared/helpers/Grid/Col";
import { mediaQueries } from "../../theme";
import UserService from "../../services/user.service";

const StyledLogin = styled(Box)`
  display: flex;
  background: url(${loginBg}) no-repeat left;
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
    left: 200px;
  }
`;

const schema = yup.object().shape({
  password: yup.string().trim().required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const ResetPass = () => {
  const { token } = useParams();
  const navigation = useNavigate();
  const errorNotify = (errors) => {
    if (errors?.message) {
      return toast.error(errors.message);
    }
  };

  const successNotify = (msg) => {
    return toast.success(msg);
  };

  const resetPass = async (values) => {
    try {
      const password = values.password;
      const confirmPassword = values.confirmPassword;
      await UserService.resetPass({ newPassword: password, token });
      setTimeout(() => {
        navigation("/login", { replace: true });
      }, 1000);

      successNotify("new password created");
    } catch (error) {
      errorNotify(error);
    }
  };

  return (
    <Container position="relative">
      <StyledLogin />
      <Grid nested minHeight="100vh" alignItems="center">
        <Col span={[4, 10, 6]}>
          <Form
            my={5}
            title="Reset Password"
            inputData={inputData}
            buttonText="Submit"
            oSubmit={resetPass}
            noForm={"noForm"}
            schema={schema}
          />
        </Col>
      </Grid>
      <ToastContainer theme="colored" />
    </Container>
  );
};
