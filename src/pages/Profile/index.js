import React, { useState, useEffect, useContext } from "react";
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

const ProfileInfoChange = styled(ProfileInfo)`
  cursor: pointer;
  color: ${theme.colors.primary.main};
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
  const { user } = useContext(UserContext);
  const navigation = useNavigate();
  const location = useLocation();

  const currentTab = tabs.find((t) => location.search.search(t.path) >= 0) || tabs[0];

  const onTabChange = (tab) => {
    navigation(`?${tab.path}`);
    console.log(location);
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
  return (
    <Container my={104}>
      <Flex mb={11}>
        <UserImage as="img" src={userImage} alt="userImage" />
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

                    <Flex alignItems="center" fontSize={2} ml={5}>
                      <ProfileInfo fontSize={2}>{user.username ? user.username : "John Doe"}</ProfileInfo>{" "}
                      <ProfileInfoChange color="primary.main" semiBold ml={5} fontSize={2} cursor="pointer">
                        Edit
                      </ProfileInfoChange>
                    </Flex>
                  </Flex>

                  <Flex alignItems="center" mb={8}>
                    <ProfileInfo fontSize={2}>Email</ProfileInfo>

                    <Flex alignItems="center" fontSize={2} ml={5}>
                      <ProfileInfo fontSize={2}>{user.email ? user.email : "testmail@test.com"} </ProfileInfo>{" "}
                      <ProfileInfoChange color="primary.main" semiBold ml={5} fontSize={2} cursor="pointer">
                        Edit
                      </ProfileInfoChange>
                    </Flex>
                  </Flex>

                  <Flex alignItems="center">
                    <ProfileInfo fontSize={2}>Password</ProfileInfo>

                    <Flex alignItems="center" fontSize={2} ml={5}>
                      <ProfileInfo fontSize={2}>*********</ProfileInfo>{" "}
                      <ProfileInfoChange color="primary.main" semiBold ml={5} fontSize={2} cursor="pointer">
                        Change My Password
                      </ProfileInfoChange>
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
    </Container>
  );
};
