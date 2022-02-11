import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUrl } from "../../hooks/useUrl";

import { CookBookCard } from "../../shared/ui-kit/CookBookCard";
import { RecipesCard } from "../../shared/ui-kit/RecipesCard";
import { Filter } from "../../components/Search/Filter";

import { TabBar } from "../../shared/ui-kit/TabBar";
import { Container } from "../../shared/helpers/Container";
import { Grid } from "../../shared/helpers/Grid";
import { Col } from "../../shared/helpers/Grid/Col";

import CookBookService from "../../services/cookbook.service";
import RecipeService from "../../services/recipe.service";

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
    value: "Views",
    label: "Views",
  },
  {
    value: "Likes",
    label: "Likes",
  },
  {
    value: "Comments",
    label: "Comments",
  },
];

export const Search = () => {
  const [timeRange, setTimeRange] = useState([0, 240]);
  const [sort, setSort] = useState(options[0]);
  const [searchData, setSearchData] = useState([]);
  const handleSort = (e) => {
    setSort({ value: e.value, label: e.label });
  };
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
              {searchData &&
                searchData.map((props, index) => {
                  if (currentTab?.path === tabs[0].path) {
                    return <CookBookCard key={index} spanList={[4, 9, 4]} {...props} />;
                  }
                  if (currentTab?.path === tabs[1].path) {
                    return <RecipesCard key={index} {...props} />;
                  }
                })}
            </Grid>
          </Container>
        </Col>
      </Grid>

      <button onClick={() => tabo()}>tabo</button>
      <button onClick={() => too()}>too</button>
      <button onClick={() => search()}>search</button>
      <button onClick={() => del()}>delete</button>
    </Container>
  );
};
