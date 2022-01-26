import { useSearchParams } from "react-router-dom";

export function useUrl() {
  const [query, updateQuery] = useSearchParams();

  return { query, updateQuery };
}
