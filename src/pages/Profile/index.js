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
import { Card } from "../../shared/ui-kit/Card";
import { Col } from "../../shared/helpers/Grid/Col";
import { Grid } from "../../shared/helpers/Grid";
import { cardListHorizontal } from "../Home/mockData";

const UserImage = styled(Box)`
  border-radius: 50%;
  max-width: 160px;
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
  const { user } = useContext(UserContext);
  console.log(user);
  const navigation = useNavigate();
  const location = useLocation();

  let currentTab = tabs.find((t) => location.search.search(t.path) >= 0);
  useEffect(() => {
    if (currentTab === undefined) {
      currentTab = tabs[0];
      navigation(`?${tabs[0].path}`);
    }
  }, []);

  const onTabChange = (tab) => {
    navigation(`?${tab.path}`);
    console.log(location);
  };

  return (
    <Container my={104}>
      <Flex mb={11}>
        <UserImage as="img" src={userImage} alt="userImage" />
        <Box ml={10}>
          <Heading as={"h2"} bold mb={5}>
            {user.username ? user.username : "John Doe"}
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
        <Button size="md" variant="primary">
          Create New CookBook
        </Button>
      </FlexBetween>
      <Box>
        <Grid nested mb={11}>
          {cardListHorizontal.map((props, index) => {
            return (
              <Col key={index} span={[4, 6, 3]}>
                <Card {...props} sizes="sm" place="no-rates" />
              </Col>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};
