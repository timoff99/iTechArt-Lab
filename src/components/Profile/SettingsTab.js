import React, { useState, useContext } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Box } from "../../shared/helpers/Box";
import { Flex } from "../../shared/helpers/Flex";
import { Heading, Paragraph } from "../../shared/helpers/Text";
import { Input } from "../../shared/ui-kit/Input";
import { Button } from "../../shared/ui-kit/Button";
import UserService from "../../services/user.service";
import { UserContext } from "../../shared/ui-kit/UserProvider";
import theme from "../../theme";
import { ErrorMessage, Formik } from "formik";

const InfoBlock = styled(Box)`
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  width: 100%;
`;

const ProfileInfo = styled(Paragraph)`
  font-size: ${theme.fontSizes[2]};
`;

const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().trim().required(),
  newPassword: yup
    .string()
    .trim()
    .required("Please enter new password")
    .matches(
      /^.*(?=.{5,})(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*\d)(?=.*[a-z,A-Z])/,
      "New pass must contain at least 5 characters, one uppercase, one number and one special case character"
    ),
});

export const SettingsTab = () => {
  const [personName, setPersonName] = useState(false);
  const [personEmail, setPersonEmail] = useState(false);
  const [personStatus, setPersonStatus] = useState(false);
  const [personPassword, setPersonPassword] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const handleOpenNameInput = () => {
    setPersonName((prev) => !prev);
  };
  const handleOpenEmailInput = () => {
    setPersonEmail((prev) => !prev);
  };
  const handleOpenStatusInput = () => {
    setPersonStatus((prev) => !prev);
  };
  const handleOpenPasswordInput = () => {
    setPersonPassword((prev) => !prev);
  };

  const errorNotify = (errors) => {
    if (errors?.message) {
      return toast.error(errors.message);
    }
  };

  const successNotify = (msg) => {
    return toast.success(msg);
  };

  const saveNewUserInfo = async (e) => {
    try {
      if (e.key === "Enter") {
        e.preventDefault();
        const updatedValue = e.target.value;
        const inputName = e.target.name;
        const updatedFiled = { [inputName]: updatedValue };
        const { data } = await UserService.updateUser(updatedFiled);
        setUser(data.updateUser);
        e.target.value = "";
        setPersonName(false);
        setPersonEmail(false);
        setPersonStatus(false);
        successNotify(`user ${inputName} updated`);
      }
    } catch (e) {
      return errorNotify(e?.response?.data);
    }
  };

  const saveNewUserPassword = async (values) => {
    try {
      const updatedFiled = { oldPassword: values.oldPassword, newPassword: values.newPassword };
      const data = await UserService.updateUser(updatedFiled);
      if (data?.response?.data) throw data;
      setUser(data.data.updateUser);
      setPersonPassword(false);
      successNotify("user password updated");
    } catch (err) {
      return errorNotify(err?.response?.data);
    }
  };

  return (
    <InfoBlock pl={[5, 11, 11]} py={12}>
      <Heading as={"h2"} bold mb={10}>
        Personal information
      </Heading>
      <Flex>
        <Box>
          <Flex alignItems="center" flexWrap="wrap" mb={8}>
            <ProfileInfo fontSize={2}>Name</ProfileInfo>
            <ProfileInfo ml={5} fontSize={2}>
              {user.username && !personName ? (
                user.username
              ) : (
                <Box mr={5}>
                  <Input
                    ml={5}
                    labelSize="sm"
                    name="username"
                    defaultValue={user.username}
                    onKeyPress={saveNewUserInfo}
                  />
                </Box>
              )}
            </ProfileInfo>
            <Button variant="settings" size="link" ml={5} alignItems="center" onClick={handleOpenNameInput}>
              Edit
            </Button>
          </Flex>

          <Flex alignItems="center" flexWrap="wrap" mb={8}>
            <ProfileInfo fontSize={2}>Email</ProfileInfo>
            <ProfileInfo ml={5} fontSize={2}>
              {user.email && !personEmail ? (
                user.email
              ) : (
                <Box mr={5}>
                  <Input ml={5} labelSize="sm" name="email" defaultValue={user.email} onKeyPress={saveNewUserInfo} />
                </Box>
              )}
            </ProfileInfo>
            <Button variant="settings" size="link" ml={5} alignItems="center" onClick={handleOpenEmailInput}>
              Edit
            </Button>
          </Flex>

          <Flex alignItems="center" flexWrap="wrap" mb={8}>
            <ProfileInfo fontSize={2}>Status</ProfileInfo>
            <ProfileInfo ml={5} fontSize={2}>
              {user.status && !personStatus ? (
                user.status
              ) : (
                <Box mr={5}>
                  <Input ml={5} labelSize="sm" name="status" defaultValue={user.status} onKeyPress={saveNewUserInfo} />
                </Box>
              )}
            </ProfileInfo>

            <Button variant="settings" size="link" ml={5} alignItems="center" onClick={handleOpenStatusInput}>
              Edit
            </Button>
          </Flex>

          <Flex alignItems="center" position="relative">
            <ProfileInfo fontSize={2}>Password</ProfileInfo>

            {!personPassword ? (
              <ProfileInfo ml={5} fontSize={2}>
                *********
              </ProfileInfo>
            ) : (
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                }}
                validationSchema={changePasswordSchema}
                onSubmit={saveNewUserPassword}
              >
                {({ handleChange, handleSubmit, values }) => (
                  <>
                    <Flex as="form" onSubmit={handleSubmit} flexDirection={"column"} mr={5}>
                      <Box>
                        <Input
                          ml={5}
                          mb={4}
                          labelSize="sm"
                          handleChange={handleChange}
                          name="oldPassword"
                          noForm
                          placeholder="Old Password"
                        />
                      </Box>

                      <Box>
                        <Input
                          ml={5}
                          labelSize="sm"
                          handleChange={handleChange}
                          name="newPassword"
                          noForm
                          placeholder="New Password"
                        />

                        {!values.oldPassword && (
                          <>
                            <Box color="red" position="absolute">
                              <ErrorMessage name={"oldPassword"} />
                            </Box>
                          </>
                        )}
                        {values.oldPassword && !values.newPassword && (
                          <>
                            <Box color="red" position="absolute">
                              <ErrorMessage name={"newPassword"} />
                            </Box>
                          </>
                        )}
                        {values.oldPassword && values.newPassword && (
                          <>
                            <Box color="red" position="absolute" left={"30px"}>
                              <ErrorMessage name={"newPassword"} />
                            </Box>
                          </>
                        )}
                      </Box>

                      <Input type="submit" display="none" />
                    </Flex>
                  </>
                )}
              </Formik>
            )}

            <Button variant="settings" size="link" ml={5} alignItems="center" onClick={handleOpenPasswordInput}>
              Change Password
            </Button>
          </Flex>
        </Box>
      </Flex>
    </InfoBlock>
  );
};
