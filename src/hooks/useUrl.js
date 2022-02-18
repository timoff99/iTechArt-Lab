import { useLocation, useSearchParams } from "react-router-dom";

export function useUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const updateQuery = (updateData) => {
    if (typeof updateData === "string") {
      for (const pair of searchParams.entries()) {
        if (pair[0] !== "tab" && pair[0] !== "sort") {
          const data = pair[1].split(",");
          if (data.length === 1) {
            query.delete(pair[0]);
            return setSearchParams(query);
          }
          pair[1] = data.filter((value) => value !== updateData).join(",");
          query.set(pair[0], pair[1]);
        }
      }
      return setSearchParams(query);
    }
    if (Object.keys(updateData)[0] === "sort") {
      let key = "";
      let value = "";

      for (const data of Object.entries(updateData)) {
        key = data[0];
        value = data[1];
      }

      const index = location.search.indexOf(key) + key.length + 1;
      let prev = [];
      if (query.has("sort")) {
        prev = query.get("sort");
      } else if (location.search.includes("sort")) {
        prev = location.search.slice(index).split(",");
      }
      if (prev.includes("cookbooks") || prev.includes("recipes") || prev.includes("")) {
        query.set(key, [value]);
        return setSearchParams(query);
      } else {
        query.set(key, [value]);
        return setSearchParams(query);
      }
    }

    if (typeof updateData === "object") {
      let key = "";
      let value = "";

      for (const data of Object.entries(updateData)) {
        key = data[0];
        value = data[1];
      }

      const index = location.search.indexOf(key) + key.length + 1;
      let prev = [];
      if (query.has("type")) {
        prev = query.get("type");
      } else if (location.search.includes("type")) {
        prev = location.search.slice(index).split(",");
      }
      if (prev.includes("cookbooks") || prev.includes("recipes") || prev.includes("")) {
        query.set(key, [prev, value]);
      } else {
        query.set(key, [value]);
      }
      setSearchParams(query);
    } // %2C === ,
  };
  const ClearAll = () => {
    if (query.has("tab")) {
      return setSearchParams(`tab=${query.get("tab")}`);
    } else {
      return setSearchParams(`tab=cookbooks`);
    }
  };
  return { query: location.search, updateQuery, ClearAll };
}
