import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUrl } from "../../hooks/useUrl";

import { TabBar } from "../../shared/ui-kit/TabBar";
import { Filter } from "../../components/CookBookSearch/Filter";
import { Modal } from "../../shared/ui-kit/Modal";
import { cookBook, recipes, cookBookResepies } from "../../pages/Home/mockData";
import { CookBooks } from "../../shared/ui-kit/ModalContent/CookBook";
import { Recipes } from "../../shared/ui-kit/ModalContent/Recipes";
import { CreateCookBook } from "../../shared/ui-kit/ModalContent/CreateCookBook";
import { CreateRecipes } from "../../shared/ui-kit/ModalContent/CreateRecipes";

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

export const CookBookSearch = () => {
  const [showModal, setShowModal] = useState(true);

  const [timeRange, setTimeRange] = useState([0, 240]);
  const [sort, setSort] = useState(options[0]);
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

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div style={{ background: "#8a5858", height: "100vh", padding: "100px" }}>
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal} openModal={openModal}>
          <CreateRecipes />
        </Modal>
      )}
      <div>
        <Filter
          label="Sort by"
          options={options}
          value={sort}
          onChange={(e) => handleSort(e)}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
      </div>
      <TabBar tabs={tabs} currentTab={currentTab} onChange={(tab) => onTabChange(tab)} />
      <button onClick={() => tabo()}>tabo</button>
      <button onClick={() => too()}>too</button>
      <button onClick={() => search()}>search</button>
      <button onClick={() => del()}>delete</button>
      <button onClick={() => openModal()}>modal</button>
    </div>
  );
};
