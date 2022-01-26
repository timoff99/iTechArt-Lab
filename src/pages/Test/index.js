import React, { useState, useRef } from "react";

import { Filter } from "../../shared/ui-kit/Filter";

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

export const Test = () => {
  const [sort, setSort] = useState(options[0]);
  const handleSort = (e) => {
    setSort({ value: e.value, label: e.label });
  };
  return (
    <div style={{ background: "#8a5858", height: "100vh", padding: "100px" }}>
      <Filter label="Sort by" options={options} value={sort} onChange={(e) => handleSort(e)} />
      <h3>
        value: {sort.value} Label: {sort.label}
      </h3>
    </div>
  );
};
