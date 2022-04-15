import React, { useState, useContext } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

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

  const saveNewUserPassword = async (e) => {
    try {
      e.preventDefault();
      const updatedFiled = { oldPassword: e.target[0].value, newPassword: e.target[1].value };
      const data = await UserService.updateUser(updatedFiled);
      if (data?.response?.data) throw data;
      setUser(data.data.updateUser);
      e.target[0].value = "";
      e.target[1].value = "";
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

          <Flex alignItems="center">
            <ProfileInfo fontSize={2}>Password</ProfileInfo>

            {!personPassword ? (
              <ProfileInfo ml={5} fontSize={2}>
                *********
              </ProfileInfo>
            ) : (
              <Flex as="form" onSubmit={saveNewUserPassword} flexDirection={["column", "row", "row"]} mr={5}>
                <Input ml={5} mb={4} labelSize="sm" name="password" noForm placeholder="Old Password" />
                <Input ml={5} labelSize="sm" name="password" noForm placeholder="New Password" />
                <Input type="submit" display="none" />
              </Flex>
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
