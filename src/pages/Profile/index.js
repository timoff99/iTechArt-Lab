import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Box } from "../../shared/helpers/Box";
import { Flex, FlexBetween } from "../../shared/helpers/Flex";
import { TabBar } from "../../shared/ui-kit/TabBar";
import { Button } from "../../shared/ui-kit/Button";
import { Container } from "../../shared/helpers/Container";
import { Heading, Paragraph } from "../../shared/helpers/Text";
import userImage from "../../static/images/userImage.jpeg";
import { UserContext } from "../../shared/ui-kit/UserProvider";
import { Grid } from "../../shared/helpers/Grid";
import CookBookService from "../../services/cookbook.service";
import RecipeService from "../../services/recipe.service";
import theme from "../../theme";
import { Modal } from "../../shared/ui-kit/Modal";
import { CreateCookBook } from "../../shared/ui-kit/ModalContent/CreateCookBook";
import { CreateRecipes } from "../../shared/ui-kit/ModalContent/CreateRecipes";
import { CookBookCard } from "../../shared/ui-kit/CookBookCard";
import { RecipesCard } from "../../shared/ui-kit/RecipesCard";
import { Input } from "../../shared/ui-kit/Input";
import UserService from "../../services/user.service";
import { ToastContainer, toast } from "react-toastify";
import ImageService from "../../services/image.service";

const UserImage = styled(Box)`
  border-radius: 50%;
  max-width: 160px;
`;

const InfoBlock = styled(Box)`
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  width: 100%;
`;

const ProfileInfo = styled(Paragraph)`
  font-size: ${theme.fontSizes[2]};
`;

const FileUploader = styled(Box)`
  display: none;
`;

const tabs = [
  {
    path: "tab=cookbooks",
    label: "My Cookbooks",
  },
  {
    path: "tab=recipes",
    label: "My Recipes",
  },
  {
    path: "tab=settings",
    label: "My Settings",
  },
];

export const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [personName, setPersonName] = useState("none");
  const [personEmail, setPersonEmail] = useState("none");
  const [personPassword, setPersonPassword] = useState("none");
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigate();
  const location = useLocation();
  const refFileInput = useRef();
  const formData = new FormData();
  const currentTab = tabs.find((t) => location.search.search(t.path) >= 0) || tabs[0];

  const onTabChange = (tab) => {
    navigation(`?${tab.path}`);
    console.log(location);
  };

  const errorNotify = (errors) => {
    if (errors?.message) {
      console.log(errors);
      return toast.error(errors.message);
    }
  };

  const successNotify = (msg) => {
    return toast.success(msg);
  };

  const getStartData = async () => {
    let data;
    if (currentTab.path === tabs[0].path) {
      data = await CookBookService.getUserCookBooks().then((res) => res.data);
    }
    if (currentTab.path === tabs[1].path) {
      data = await RecipeService.getUserRecipes().then((res) => res.data);
    }
    setSearchData(data);
  };
  useEffect(() => {
    getStartData();
  }, [currentTab?.path]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleOpenNameInput = () => {
    setPersonName((prev) => (prev === "none" ? "block" : "none"));
  };
  const handleOpenEmailInput = () => {
    setPersonEmail((prev) => (prev === "none" ? "block" : "none"));
  };
  const handleOpenPasswordInput = () => {
    setPersonPassword((prev) => (prev === "none" ? "block" : "none"));
  };

  const saveNewUserInfo = async (e) => {
    try {
      if (e.key === "Enter") {
        e.preventDefault();
        console.log(e.target);
        const updatedValue = e.target.value;
        const inputName = e.target.name;
        const updatedFiled = { [inputName]: updatedValue };
        const { data } = await UserService.updateUser(updatedFiled);
        setUser(data.updateUser);
        e.target.value = "";
        setPersonName("none");
        setPersonEmail("none");
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
      const { data } = await UserService.updateUser(updatedFiled);
      setUser(data.updateUser);
      e.target[0].value = "";
      e.target[1].value = "";
      setPersonPassword("none");
      successNotify("user password updated");
    } catch (e) {
      return errorNotify(e?.response?.data);
    }
  };

  const setImage = async (e) => {
    formData.append("image", e.target.files[0]);
    const image = await ImageService.addImage(formData);
    const updatedFiled = { image: image.data.secure_url, cloudinary_id: image.data.public_id };
    const { data } = await UserService.updateUser(updatedFiled);
    setUser(data.updateUser);
  };
  const handleClickFileUploader = (e) => {
    e.preventDefault();
    refFileInput.current.click();
  };
  return (
    <Container my={104}>
      <Flex mb={11} alignItems="center">
        <FileUploader as="input" ref={refFileInput} type="file" id="img" name="img" onChange={(e) => setImage(e)} />
        <UserImage
          as="img"
          src={user.image ? user.image : userImage}
          alt="userImage"
          onClick={(e) => handleClickFileUploader(e)}
        />
        <Box ml={10}>
          <Heading as={"h2"} bold mb={5}>
            {user.username}
          </Heading>
          <Paragraph maxWidth={504}>
            {user.description
              ? user.description
              : "I don’t know about you but I love pizza. Especially when that pizza comes with Papa John’s very own garlic pizza sticks."}
          </Paragraph>
        </Box>
      </Flex>
      <FlexBetween mb={5}>
        <TabBar tabs={tabs} currentTab={currentTab} onChange={(tab) => onTabChange(tab)} />
        {currentTab?.path === tabs[0].path && (
          <Button size="md" variant="primary" onClick={toggleModal}>
            Create New CookBook
          </Button>
        )}
        {currentTab?.path === tabs[1].path && (
          <Button size="md" variant="primary" onClick={toggleModal}>
            Create New Recipe
          </Button>
        )}
      </FlexBetween>
      <Box>
        <Grid nested mb={11}>
          {searchData &&
            searchData.map((props, index) => {
              if (currentTab?.path === tabs[0].path) {
                return <CookBookCard key={index} spanList={[4, 6, 3]} {...props} />;
              }
              if (currentTab?.path === tabs[1].path) {
                return <RecipesCard key={index} {...props} />;
              }
            })}
          {currentTab?.path === tabs[2].path && (
            <InfoBlock pl={11} py={12}>
              <Heading as={"h2"} bold mb={10}>
                Personal information
              </Heading>
              <Flex>
                <Box>
                  <Flex alignItems="center" mb={8}>
                    <ProfileInfo fontSize={2}>Name</ProfileInfo>
                    <ProfileInfo ml={5} fontSize={2}>
                      {user.username ? user.username : "John Doe"}
                    </ProfileInfo>
                    <Button variant="link" size="link" ml={5} alignItems="center" onClick={handleOpenNameInput}>
                      Edit
                    </Button>
                    <Input ml={5} labelSize="sm" name="username" display={personName} onKeyPress={saveNewUserInfo} />
                  </Flex>

                  <Flex alignItems="center" mb={8}>
                    <ProfileInfo fontSize={2}>Email</ProfileInfo>
                    <ProfileInfo ml={5} fontSize={2}>
                      {user.email ? user.email : "testmail@test.com"}
                    </ProfileInfo>
                    <Button variant="link" size="link" ml={5} alignItems="center" onClick={handleOpenEmailInput}>
                      Edit
                    </Button>
                    <Input ml={5} labelSize="sm" name="email" display={personEmail} onKeyPress={saveNewUserInfo} />
                  </Flex>

                  <Flex alignItems="center">
                    <ProfileInfo fontSize={2}>Password</ProfileInfo>
                    <ProfileInfo ml={5} fontSize={2}>
                      *********
                    </ProfileInfo>
                    <Button variant="link" size="link" ml={5} alignItems="center" onClick={handleOpenPasswordInput}>
                      Change My Password
                    </Button>
                    <Flex as="form" onSubmit={saveNewUserPassword}>
                      <Input
                        ml={5}
                        labelSize="sm"
                        name="password"
                        display={personPassword}
                        noForm
                        placeholder="Old Password"
                      />
                      <Input
                        ml={5}
                        labelSize="sm"
                        name="password"
                        display={personPassword}
                        noForm
                        placeholder="New Password"
                      />
                      <Input type="submit" display="none" />
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </InfoBlock>
          )}
        </Grid>
      </Box>
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          {currentTab?.path === tabs[0].path && <CreateCookBook setShowModal={toggleModal} />}
          {currentTab?.path === tabs[1].path && <CreateRecipes setShowModal={toggleModal} />}
        </Modal>
      )}
      <ToastContainer theme="colored" />
    </Container>
  );
};
