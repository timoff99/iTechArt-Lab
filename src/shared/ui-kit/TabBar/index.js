import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Heading } from "../../helpers/Text";
import { Wrapper, Tab, ActiveTab } from "./styles";

export const TabBar = ({ tabs }) => {
  const navigation = useNavigate();
  const location = useLocation();

  let currentTab = tabs.find((t) => t.path === location.search.slice(1));

  useEffect(() => {
    if (currentTab === undefined) {
      currentTab = tabs[0];
      navigation(`?${tabs[0].path}`);
    }
  }, []);

  const onTabChange = (tab) => {
    navigation(`?${tab.path}`);
  };
  return (
    <Wrapper>
      {tabs.map((tab) =>
        currentTab?.path === tab.path ? (
          <ActiveTab key={tab.path} type="button" onClick={() => onTabChange(tab)}>
            <Heading as={"h3"} semiBold>
              {tab.label}
            </Heading>
          </ActiveTab>
        ) : (
          <Tab key={tab.path} type="button" onClick={() => onTabChange(tab)}>
            <Heading as={"h3"} semiBold>
              {tab.label}
            </Heading>
          </Tab>
        )
      )}
    </Wrapper>
  );
};
