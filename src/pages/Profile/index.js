import React, { useState, useContext, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

import { Box } from "../../shared/helpers/Box";
import { Flex, FlexBetween } from "../../shared/helpers/Flex";
import { TabBar } from "../../shared/ui-kit/TabBar";
import { Button } from "../../shared/ui-kit/Button";
import { Container } from "../../shared/helpers/Container";
import { Heading, Paragraph } from "../../shared/helpers/Text";
import { UserContext } from "../../shared/ui-kit/UserProvider";
import { Modal } from "../../shared/ui-kit/Modal";
import { CreateCookBook } from "../../shared/ui-kit/ModalContent/CreateCookBook";
import { CreateRecipes } from "../../shared/ui-kit/ModalContent/CreateRecipes";

import UserService from "../../services/user.service";
import ImageService from "../../services/image.service";

import { SettingsTab } from "../../components/Profile/SettingsTab";
import { CookBookTab } from "../../components/Profile/CookBookTab";
import { RecipeTab } from "../../components/Profile/RecipeTab";
import { useUrl } from "../../hooks/useUrl";
import { Loader } from "../../shared/ui-kit/Loader";
import { colors } from "../../theme";
import { Input } from "../../shared/ui-kit/Input";

const UserImage = styled(Box)`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { query, updateQuery } = useUrl();

  const navigation = useNavigate();
  const location = useLocation();
  const formData = new FormData();
  const currentTab = tabs.find((t) => location.search.search(t.path) >= 0) || tabs[0];

  const onTabChange = (tab) => {
    navigation(`?${tab.path}`);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const successNotify = (msg) => {
    return toast.success(msg);
  };

  const setImage = async (e) => {
    try {
      setLoading(true);
      formData.append("image", e.target.files[0]);
      const image = await ImageService.addImage(formData);
      const updatedFiled = { image: image.data.secure_url, cloudinary_id: image.data.public_id };
      const { data } = await UserService.updateUser(updatedFiled);
      setUser(data.updateUser);
      successNotify("image upload successfully");
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const debouncedChange = debounce((value) => {
    if (value === "") {
      return updateQuery(value);
    }
    updateQuery({ search: value });
  }, 500);

  const handleChange = useCallback(
    (e) => {
      debouncedChange(e.target.value);
    },
    [debouncedChange]
  );

  return (
    <Container my={[6, 50, 104]}>
      <Flex mb={10} alignItems="center">
        <label htmlFor="lable-input">
          <FileUploader as="input" type="file" id="lable-input" name="img" onChange={setImage} />
          <Box
            overflow="hidden"
            borderRadius="50%"
            mr={[4, 10, 10]}
            width={["126px", "160px", "160px"]}
            height={["126px", "160px", "160px"]}
          >
            {user.image && !loading ? (
              <UserImage as="img" src={user.image} alt="userImage" />
            ) : (
              <Box display="flex" justifyContent="center">
                <Loader color={colors.primary.main} height={"lg"} width={"lg"} />
              </Box>
            )}
          </Box>
        </label>
        <Box>
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
      {currentTab?.path !== tabs[2].path && (
        <Input
          display={["flex", "none", null]}
          alignItems="center"
          type="text"
          name="smallSearch"
          variantLabel="labelInput"
          variantInput="searchInput"
          inputSize="sm"
          labelSize="md"
          defaultValue={query.search}
          handleChange={handleChange}
        />
      )}
      <FlexBetween mb={5} flexWrap={["wrap", "nowrap", "nowrap"]}>
        <TabBar tabs={tabs} currentTab={currentTab} onChange={(tab) => onTabChange(tab)} />
        {currentTab?.path === tabs[0].path && (
          <Button size="md" variant="primary" onClick={toggleModal}>
            Create New
          </Button>
        )}
        {currentTab?.path === tabs[1].path && (
          <Button size="md" variant="primary" onClick={toggleModal}>
            Create New
          </Button>
        )}
      </FlexBetween>
      <Box>
        {currentTab?.path === tabs[0].path && <CookBookTab query={query} />}

        {currentTab?.path === tabs[1].path && <RecipeTab query={query} />}

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
