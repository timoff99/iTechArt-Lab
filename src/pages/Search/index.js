import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Filter } from "../../components/Search/Filter";

import { TabBar } from "../../shared/ui-kit/TabBar";
import { Container } from "../../shared/helpers/Container";
import { Grid } from "../../shared/helpers/Grid";
import { Col } from "../../shared/helpers/Grid/Col";

import { useUrl } from "../../hooks/useUrl";
import { SearchCookBookCard } from "../../components/SearchCookBookCard";
import { SearchRecipeCard } from "../../components/SearchRecipeCard";

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

const options = [
  {
    value: "views",
    label: "Views",
  },
  {
    value: "likes",
    label: "Likes",
  },
  {
    value: "comments",
    label: "Comments",
  },
];

export const Search = () => {
  const { query } = useUrl();
  const [timeRange, setTimeRange] = useState(query.cookingRange ? query.cookingRange : [0, 240]);
  const startValue = options.filter((option) => option.value === query.sort[0]);
  const [sort, setSort] = useState(startValue);

  const handleSort = (e) => {
    setSort({ value: e.value, label: e.label });
  };
  const navigation = useNavigate();
  const location = useLocation();

  const currentTab = tabs.find((t) => location.search.search(t.path) >= 0) || tabs[0];

  const onTabChange = (tab) => {
    if (!location.search.includes("tab")) {
      navigation(`?${tab.path}&${location.search.slice(1)}`);
    } else {
      navigation(`?${tab.path}`);
    }
  };
  return (
    <Container my={[6, 50, 104]}>
      <Grid nested>
        <Col span={[4, 5, 3]}>
          <Filter
            label="Sort by"
            options={options}
            value={sort}
            onChange={(e) => handleSort(e)}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            route={currentTab?.path}
          />
        </Col>
        <Col span={[4, 7, 9]}>
          <TabBar tabs={tabs} currentTab={currentTab} onChange={(tab) => onTabChange(tab)} />
          <Container>
            {currentTab?.path === tabs[0].path && <SearchCookBookCard query={query} />}
            {currentTab?.path === tabs[1].path && <SearchRecipeCard query={query} timeRange={timeRange} />}
          </Container>
        </Col>
      </Grid>
    </Container>
  );
};
