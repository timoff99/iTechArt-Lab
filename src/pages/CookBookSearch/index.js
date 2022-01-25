import React from "react";

import { TabBar } from "../../shared/ui-kit/TabBar";

const tabs = [
  {
    path: "cookbooks",
    label: "Cookbooks",
  },
  {
    path: "recipes",
    label: "Recipes",
  },
];

export const CookBookSearch = () => {
  return <TabBar tabs={tabs} />;
};
