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

  const { query, updateQuery } = useUrl();

  const tabo = () => {
    updateQuery({
      ...query,
      tabo: "barr",
    });
  };
  const too = () => {
    updateQuery({
      ...query,
      too: "to",
    });
  };
  const search = () => {
    updateQuery({
      ...query,
      search: "boom",
    });
  };

  const del = () => {
    updateQuery("search");
  };
  return (
    <div>
      <TabBar tabs={tabs} currentTab={currentTab} onChange={(tab) => onTabChange(tab)} />
      <button onClick={() => tabo()}>tabo</button>
      <button onClick={() => too()}>too</button>
      <button onClick={() => search()}>search</button>
      <button onClick={() => del()}>delete</button>
    </div>
  );
};
