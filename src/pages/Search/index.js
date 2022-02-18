import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CookBookCard } from "../../shared/ui-kit/CookBookCard";
import { RecipesCard } from "../../shared/ui-kit/RecipesCard";
import { Filter } from "../../components/Search/Filter";

import { TabBar } from "../../shared/ui-kit/TabBar";
import { Container } from "../../shared/helpers/Container";
import { Grid } from "../../shared/helpers/Grid";
import { Col } from "../../shared/helpers/Grid/Col";

import { cookBookApi } from "../../services/cookbook.service";
import { recipeApi } from "../../services/recipe.service";
import { useUrl } from "../../hooks/useUrl";

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
  const [timeRange, setTimeRange] = useState([0, 240]);
  const [sort, setSort] = useState(options[0]);
  const [skipCook, setSkipCook] = useState(true);
  const [skipRecipe, setSkipRecipe] = useState(true);
  const [skip, setSkip] = useState(false);
  const { query, updateQuery, ClearAll } = useUrl();
  const _ = [];
  const { data: sortedCookBook } = cookBookApi.useGetSortedCookBookQuery(query, {
    skip: skipCook,
  });
  const { data: cookBooksSortBy } = cookBookApi.useGetCookBooksSortByQuery(query, sortedCookBook, {
    skip: skipCook,
  });
  const { data: allRecipes } = recipeApi.useGetAllRecipesQuery(_, {
    skip: skipRecipe,
  });
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

  const getStartData = () => {
    if (currentTab.path === tabs[0].path) {
      setSkipCook((prev) => !prev);
    }
    if (currentTab.path === tabs[1].path) {
      setSkipRecipe((prev) => !prev);
    }
  };
  useEffect(() => {
    getStartData();
  }, [currentTab?.path]);

  return (
    <Container mt={13}>
      <Grid>
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
            <Grid nested mt={11}>
              {cookBooksSortBy &&
                cookBooksSortBy.map((props, index) => {
                  if (currentTab?.path === tabs[0].path) {
                    return <CookBookCard key={index} spanList={[4, 9, 4]} {...props} />;
                  }
                })}
              {allRecipes &&
                allRecipes.map((props, index) => {
                  if (currentTab?.path === tabs[1].path) {
                    return <RecipesCard key={index} {...props} />;
                  }
                })}
            </Grid>
          </Container>
        </Col>
      </Grid>
    </Container>
  );
};
