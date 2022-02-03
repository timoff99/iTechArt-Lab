import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

import { ReactComponent as Logo } from "../../../static/icons/logo.svg";
import { Box } from "../../helpers/Box";
import { Button } from "../Button";
import { Input } from "../Input";
import theme from "../../../theme";
import { Heading, Paragraph, LinkRenderer } from "../../helpers/Text";
import AuthService from "../../../services/auth.service";

const StyledForm = styled(Box)`
  background: ${theme.colors.background.main};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 15%);
  border-radius: 40px 10px;
  padding: 72px 56px;
  position: relative;
  z-index: 2;
`;

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().trim().required(),
  confirmPassword: yup.string().trim().required(),
});

export const Form = ({ title, description, link, inputData, href, buttonText, auth, ...props }) => {
  const notify = (errors, values) => {
    if (errors.message) {
      return toast.error(errors.message);
    }
    if (Object.keys(errors).length == 0 && Object.values(values)[0].length !== 0) {
      return toast.success("user signup");
    }
    if (errors.email) {
      toast.error(errors.email);
    }
    if (errors.password) {
      toast.error(errors.password);
    }
    if (errors.confirmPassword) {
      toast.error(errors.confirmPassword);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        if (auth === "signup") {
          if (values.password !== values.confirmPassword) {
            return;
          }
          console.log("signup");
          try {
            Cookies.set("token", "123");
            const data = await AuthService.signup(values.email, values.password);
            Cookies.set("token", data.token);
            console.log(data);
            return data;
          } catch (e) {
            console.log(e);

            return notify(e.response.data, values);
          }
        }
        console.log("login");
        const loginData = await AuthService.login(values.email, values.password);
        // localStorage.setItem("token", loginData.data.token);
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <StyledForm as="form" {...props} onSubmit={handleSubmit}>
          <Logo />
          <Heading mt={8} mb={2} as={"h2"} bold>
            {title}
          </Heading>
          <Paragraph semiBold mb={9} fontSize={1}>
            {description}{" "}
            <LinkRenderer href={href} inline>
              {link}
            </LinkRenderer>
          </Paragraph>
          {inputData.map((data, index) => {
            return <Input handleChange={handleChange} key={index} {...data} variantInput="loginInput" />;
          })}

          <Button size="fit" mt="14px" type="submit" onClick={() => notify(errors, values)}>
            {buttonText}
          </Button>
          <ToastContainer theme="colored" />
        </StyledForm>
      )}
    </Formik>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  inputData: PropTypes.array,
  buttonText: PropTypes.string,
};
