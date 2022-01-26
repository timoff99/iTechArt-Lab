import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUrl } from "../../hooks/useUrl";

import { TabBar } from "../../shared/ui-kit/TabBar";

const tabs = [
  {
    path: "tab=cookbooks",
    label: "Cookbooks",
  },
  {
    path: "tab=recipes",
    label: "Recipes",
  },
];

export const CookBookSearch = () => {
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

  const params = {};

  params.tabo = "barr";
  params.too = "to";
  params.search = "boom";

  const { query, updateQuery } = useUrl();

  const second = () => {
    updateQuery(params);
  };

  const del = () => {
    delete params.too;
    updateQuery(params);
  };
  return (
    <div>
      <TabBar tabs={tabs} currentTab={currentTab} onChange={(tab) => onTabChange(tab)} />
      <button onClick={() => second()}>add</button>
      <button onClick={() => del()}>delete</button>
    </div>
  );
};
