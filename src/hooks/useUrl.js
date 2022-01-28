import { useSearchParams } from "react-router-dom";

export function useUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = {};
  for (const pair of searchParams.entries()) {
    query[pair[0]] = pair[1];
  }

  const updateQuery = (updateData) => {
    if (typeof updateData === "string") {
      delete query[updateData];
      setSearchParams(query);
    }
    if (typeof updateData === "object") {
      setSearchParams(updateData);
    }
  };
  return { query, updateQuery };
}
