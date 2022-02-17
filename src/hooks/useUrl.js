import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function useUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const updateQuery = (updateData) => {
    if (typeof updateData === "string") {
      delete query[updateData];
      setSearchParams(query);
      // navigation(query);
    }
    if (typeof updateData === "object") {
      console.log(Object.keys(updateData)[0]);
      console.log(Object.values(updateData)[0]);
      console.log(location.search);
      const startIndex = location.search.indexOf(Object.keys(updateData)[0]);
      const endIndex = startIndex + Object.keys(updateData)[0].length + 1;
      const prev = location.search.slice(endIndex).split(",");
      console.log(endIndex);
      console.log(Object.values(updateData)[0]);
      console.log(prev);
      console.log(...prev);
      // navigation(`${query.search}${updateQuery}`);
      if (prev.includes("cookbooks") || prev.includes("recipes") || prev.includes("")) {
        query.set(Object.keys(updateData)[0], [Object.values(updateData)[0]]);
      } else {
        query.set(Object.keys(updateData)[0], [...prev, Object.values(updateData)[0]]);
      }
      setSearchParams(query);
    }
    console.log(location.search);
  };
  return { query, updateQuery };
}
