import React, { useState, useContext } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ErrorMessage, Formik } from "formik";

import { Box } from "../../shared/helpers/Box";
import { Flex } from "../../shared/helpers/Flex";
import { Heading, Paragraph } from "../../shared/helpers/Text";
import { Input } from "../../shared/ui-kit/Input";
import { Button } from "../../shared/ui-kit/Button";
import UserService from "../../services/user.service";
import { UserContext } from "../../shared/ui-kit/UserProvider";
import theme from "../../theme";

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
      e.preventDefault();
      const updatedValue = e.target[0].value;
      const inputName = e.target[0].name;
      const updatedFiled = { [inputName]: updatedValue };
      const { data } = await UserService.updateUser(updatedFiled);
      setUser(data.updateUser);
      e.target[0].value = "";
      setPersonName(false);
      setPersonEmail(false);
      setPersonStatus(false);
      successNotify(`User ${inputName} updated.`);
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
      successNotify("User password updated.");
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
          {user.username && !personName ? (
            <Flex alignItems={["flex-start", "center", "center"]} flexDirection={["column", "row", "row"]} mb={8}>
              <ProfileInfo fontSize={2}>Name</ProfileInfo>
              <ProfileInfo ml={[0, "84px", "84px"]} fontSize={2}>
                {user.username}
              </ProfileInfo>
              <Button variant="settings" size="link" ml={[0, 5, 5]} alignItems="center" onClick={handleOpenNameInput}>
                Edit
              </Button>
            </Flex>
          ) : (
            <Flex alignItems="flex-start" flexWrap="wrap" mb={8} flexDirection="column">
              <ProfileInfo fontSize={2}>Name</ProfileInfo>
              <Flex as="form" mr={5} onSubmit={saveNewUserInfo} flexDirection={["column", "row", "row"]}>
                <Input labelSize="sm" name="username" defaultValue={user.username} />
                <Box alignSelf="center" mt={[2, 0, 0]}>
                  <Button variant="secondaryMenu" size="box" ml={2} type="reset" onClick={handleOpenNameInput}>
                    Cancel
                  </Button>
                  <Button variant="link" size="box" ml={2} type="submit">
                    Submit
                  </Button>
                </Box>
              </Flex>
            </Flex>
          )}

          {user.email && !personEmail ? (
            <Flex alignItems={["flex-start", "center", "center"]} flexDirection={["column", "row", "row"]} mb={8}>
              <ProfileInfo fontSize={2}>Email</ProfileInfo>
              <ProfileInfo ml={[0, "88px", "88px"]} fontSize={2}>
                {user.email}
              </ProfileInfo>
              <Button variant="settings" size="link" ml={[0, 5, 5]} alignItems="center" onClick={handleOpenEmailInput}>
                Edit
              </Button>
            </Flex>
          ) : (
            <Flex alignItems="flex-start" flexWrap="wrap" mb={8} flexDirection="column">
              <ProfileInfo fontSize={2}>Email</ProfileInfo>
              <Flex as="form" mr={5} onSubmit={saveNewUserInfo} flexDirection={["column", "row", "row"]}>
                <Input labelSize="sm" name="email" type="email" defaultValue={user.email} />
                <Box alignSelf="center" mt={[2, 0, 0]}>
                  <Button variant="secondaryMenu" size="box" ml={2} type="reset" onClick={handleOpenEmailInput}>
                    Cancel
                  </Button>
                  <Button variant="link" size="box" ml={2} type="submit">
                    Submit
                  </Button>
                </Box>
              </Flex>
            </Flex>
          )}

          {user.status && !personStatus ? (
            <Flex alignItems={["flex-start", "center", "center"]} flexDirection={["column", "row", "row"]} mb={8}>
              <ProfileInfo fontSize={2}>Status</ProfileInfo>
              {user.status.length > 50 ? (
                <ProfileInfo ml={[0, "82px", "82px"]} fontSize={2} width="70%">
                  {user.status}
                </ProfileInfo>
              ) : (
                <ProfileInfo ml={[0, "82px", "82px"]} fontSize={2}>
                  {user.status}
                </ProfileInfo>
              )}
              <Button variant="settings" size="link" ml={[0, 5, 5]} alignItems="center" onClick={handleOpenStatusInput}>
                Edit
              </Button>
            </Flex>
          ) : (
            <Flex alignItems="flex-start" flexWrap="wrap" mb={8} flexDirection="column">
              <ProfileInfo fontSize={2}>Status</ProfileInfo>
              <Flex as="form" mr={5} onSubmit={saveNewUserInfo} flexDirection={["column", "row", "row"]}>
                <Input labelSize="sm" name="status" defaultValue={user.status} />
                <Box alignSelf="center" mt={[2, 0, 0]}>
                  <Button variant="secondaryMenu" size="box" ml={2} type="reset" onClick={handleOpenStatusInput}>
                    Cancel
                  </Button>
                  <Button variant="link" size="box" ml={2} type="submit">
                    Submit
                  </Button>
                </Box>
              </Flex>
            </Flex>
          )}

          {!personPassword ? (
            <Flex
              alignItems={["flex-start", "center", "center"]}
              flexDirection={["column", "row", "row"]}
              mb={8}
              position="relative"
            >
              <ProfileInfo fontSize={2} mb={[1, 0, 0]}>
                Password
              </ProfileInfo>

              <ProfileInfo ml={[0, 11, 11]} fontSize={2}>
                *********
              </ProfileInfo>

              <Button
                variant="settings"
                size="link"
                ml={[0, 5, 5]}
                alignItems="center"
                onClick={handleOpenPasswordInput}
              >
                Change Password
              </Button>
            </Flex>
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
                  <Flex alignItems="flex-start" flexWrap="wrap" flexDirection="column">
                    <ProfileInfo fontSize={2}>Password</ProfileInfo>
                    <Flex as="form" mr={5} onSubmit={handleSubmit} flexDirection={["column", "row", "row"]}>
                      <Box mb={[2, 0, 0]}>
                        <Input
                          labelSize="sm"
                          handleChange={handleChange}
                          name="oldPassword"
                          noForm
                          placeholder="Old Password"
                        />
                      </Box>

                      <Box>
                        <Input
                          labelSize="sm"
                          handleChange={handleChange}
                          name="newPassword"
                          noForm
                          placeholder="New Password"
                        />
                      </Box>

                      <Box alignSelf="center" mt={[2, 0, 0]}>
                        <Button
                          variant="secondaryMenu"
                          size="box"
                          ml={2}
                          type="reset"
                          onClick={handleOpenPasswordInput}
                        >
                          Cancel
                        </Button>
                        <Button variant="link" size="box" ml={2} type="submit">
                          Submit
                        </Button>
                      </Box>
                    </Flex>
                  </Flex>
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
                      <Box color="red" position="absolute" width={["auto", 600, "auto"]}>
                        <ErrorMessage name={"newPassword"} />
                      </Box>
                    </>
                  )}
                </>
              )}
            </Formik>
          )}
        </Box>
      </Flex>
    </InfoBlock>
  );
};
