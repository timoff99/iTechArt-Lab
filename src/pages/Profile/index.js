import React, { useState, useRef, useContext } from "react";
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
import { Modal } from "../../shared/ui-kit/Modal";
import { CreateCookBook } from "../../shared/ui-kit/ModalContent/CreateCookBook";
import { CreateRecipes } from "../../shared/ui-kit/ModalContent/CreateRecipes";

import UserService from "../../services/user.service";
import ImageService from "../../services/image.service";
import { SettingsTab } from "../../components/Profile/SettingsTab";
import { CookBookTab } from "../../components/Profile/CookBookTab";
import { RecipeTab } from "../../components/Profile/RecipeTab";

const UserImage = styled(Box)`
  border-radius: 50%;
  max-width: 160px;
  object-fit: cover;
  cursor: pointer;
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
  const { user, setUser } = useContext(UserContext);

  const navigation = useNavigate();
  const location = useLocation();
  const refFileInput = useRef();
  const formData = new FormData();
  const currentTab = tabs.find((t) => location.search.search(t.path) >= 0) || tabs[0];

  const onTabChange = (tab) => {
    navigation(`?${tab.path}`);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
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
    <Container my={[6, 50, 104]}>
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
            {user.status
              ? user.status
              : "I don’t know about you but I love pizza. Especially when that pizza comes with Papa John’s very own garlic pizza sticks."}
          </Paragraph>
        </Box>
      </Flex>
      <FlexBetween mb={5} flexWrap={["wrap", "nowrap", "nowrap"]}>
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
        {currentTab?.path === tabs[0].path && <CookBookTab />}

        {currentTab?.path === tabs[1].path && <RecipeTab />}

        {currentTab?.path === tabs[2].path && <SettingsTab />}
      </Box>
      {showModal && (
        <Modal showModal={showModal} setShowModal={toggleModal}>
          {currentTab?.path === tabs[0].path && <CreateCookBook setShowModal={toggleModal} />}
          {currentTab?.path === tabs[1].path && <CreateRecipes setShowModal={toggleModal} />}
        </Modal>
      )}
    </Container>
  );
};
