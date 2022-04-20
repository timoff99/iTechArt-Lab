import React, { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

import { Filter } from "../../components/Search/Filter";

import { TabBar } from "../../shared/ui-kit/TabBar";
import { Container } from "../../shared/helpers/Container";
import { Grid } from "../../shared/helpers/Grid";
import { Col } from "../../shared/helpers/Grid/Col";

import { useUrl } from "../../hooks/useUrl";
import { SearchCookBookCard } from "../../components/SearchCookBookCard";
import { SearchRecipeCard } from "../../components/SearchRecipeCard";
import { Input } from "../../shared/ui-kit/Input";

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
  const { query, updateQuery } = useUrl();
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
      <Grid nested>
        <Col span={[4, 12, 3]}>
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
        <Col span={[4, 12, 9]}>
          <Input
            display={["flex", "none", null]}
            alignItems="center"
            type="text"
            name="smallSearch"
            variantLabel="labelInput"
            variantInput="searchInput"
            inputSize="sm"
            labelSize="smx"
            defaultValue={query.search}
            handleChange={handleChange}
          />
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
