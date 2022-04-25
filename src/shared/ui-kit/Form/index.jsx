import React, { useContext, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { ReactComponent as Logo } from "../../../static/icons/logo.svg";
import { Box } from "../../helpers/Box";
import { Button } from "../Button";
import { Input } from "../Input";
import theme from "../../../theme";
import { Heading, Paragraph, LinkRenderer } from "../../helpers/Text";
import AuthService from "../../../services/auth.service";
import UserService from "../../../services/user.service";
import { UserContext } from "../UserProvider";
import { ROUTE_NAMES } from "../../../router/routeNames";

const StyledForm = styled(Box)`
  background: ${theme.colors.background.main};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 15%);
  border-radius: 40px 10px;
  padding: 72px 56px;
  position: relative;
  z-index: 2;
`;

const defaultSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().trim().required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});
export const Form = ({
  title,
  description,
  link,
  inputData,
  href,
  buttonText,
  auth,
  oSubmit,
  schema = defaultSchema,
  ...props
}) => {
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigation = useNavigate();
  const errorNotify = (errors) => {
    if (errors?.message) {
      return toast.error(errors.message);
    }
  };

  const successNotify = (msg) => {
    return toast.success(msg);
  };

  const asyncHandleSubmit = async (values) => {
    setLoading(true);
    if (auth === "signup") {
      try {
        const signinData = await AuthService.signup(values.email, values.password);
        if (!signinData.data) {
          throw signinData;
        }
        Cookies.set("token", signinData.data.token);
        const user = await UserService.getUser();
        setUser(user.data.user);
        successNotify("User signup.");
        setTimeout(() => {
          navigation(ROUTE_NAMES.PROFILETABCOOKBOOKS, { replace: true });
        }, 1000);
        return true;
      } catch (e) {
        return errorNotify(e?.response?.data);
      } finally {
        setLoading(false);
      }
    }
    try {
      const loginData = await AuthService.login(values.email, values.password);
      if (!loginData.data) {
        throw loginData;
      }
      Cookies.set("token", loginData.data.token);
      const user = await UserService.getUser();
      if (user.request.status === 403) {
        throw user;
      }
      setUser(user.data.user);
      successNotify("User login.");
      setTimeout(() => {
        navigation(ROUTE_NAMES.PROFILETABCOOKBOOKS, { replace: true });
      }, 1000);
      return true;
    } catch (e) {
      return errorNotify(e?.response?.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        if (oSubmit) {
          oSubmit(values);
          setDisable(true);
        } else {
          asyncHandleSubmit(values);
        }
      }}
    >
      {({ handleChange, handleSubmit }) => (
        <StyledForm as="form" {...props} onSubmit={handleSubmit}>
          <Logo />
          <Heading mt={8} mb={2} as={"h2"} bold>
            {title}
          </Heading>
          <Paragraph semiBold mb={9} fontSize={1}>
            {description}{" "}
            {href && (
              <LinkRenderer href={href} inline>
                {link}
              </LinkRenderer>
            )}
          </Paragraph>
          {inputData.map((data, index) => {
            return (
              <Input
                handleChange={handleChange}
                key={index}
                {...data}
                noForm={props.noForm}
                variantInput="loginInput"
                form
              />
            );
          })}
          <Button size="fit" mt="14px" type="submit" disabled={disable} loading={+loading}>
            {buttonText}
          </Button>
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
