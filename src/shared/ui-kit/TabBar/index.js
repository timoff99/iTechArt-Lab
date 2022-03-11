import React from "react";

import { Heading } from "../../helpers/Text";
import { Wrapper, Tab, ActiveTab } from "./styles";

export const TabBar = ({ tabs, currentTab, onChange }) => {
  return (
    <Wrapper mb={6}>
      {tabs.map((tab) =>
        currentTab?.path === tab.path ? (
          <ActiveTab key={tab.path} type="button" onClick={() => onChange(tab)}>
            <Heading as={"h3"} semiBold>
              {tab.label}
            </Heading>
          </ActiveTab>
        ) : (
          <Tab key={tab.path} type="button" onClick={() => onChange(tab)}>
            <Heading as={"h3"} semiBold>
              {tab.label}
            </Heading>
          </Tab>
        )
      )}
    </Wrapper>
  );
};
