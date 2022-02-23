import { useLocation, useSearchParams } from "react-router-dom";

export function useUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const URLSPquery = new URLSearchParams(location.search);
  const query = {};
  const initQuery = (() => {
    if (!URLSPquery.has("sort")) {
      URLSPquery.set("sort", ["views"]);
    }
    if (URLSPquery.has("type")) {
      query.type = URLSPquery.get("type").split(",");
    }
    if (URLSPquery.has("sort")) {
      query.sort = URLSPquery.get("sort").split(",");
    }
    if (URLSPquery.has("cookingRange")) {
      query.cookingRange = URLSPquery.get("cookingRange").split(",");
    }
    return query;
  })();

  const updateQuery = (updateData) => {
    if (typeof updateData === "string") {
      for (const pair of searchParams.entries()) {
        if (pair[0] !== "tab" && pair[0] !== "sort") {
          const data = pair[1].split(",");
          if (data.length === 1) {
            URLSPquery.delete(pair[0]);
            return setSearchParams(URLSPquery);
          }
          pair[1] = data.filter((value) => value !== updateData).join(",");
          URLSPquery.set(pair[0], pair[1]);
        }
      }
      return setSearchParams(URLSPquery);
    }

    if (typeof updateData === "object") {
      let key = "";
      let value = "";

      for (const data of Object.entries(updateData)) {
        key = data[0];
        value = data[1];
      }
      let prev = [];

      if (Object.keys(updateData)[0] === "sort") {
        if (URLSPquery.has("sort")) {
          prev = URLSPquery.get("sort");
        } else if (query.sort) {
          prev = query.sort;
        }
      } else {
        if (URLSPquery.has("type")) {
          prev = URLSPquery.get("type");
        } else if (query.type) {
          prev = query.type;
        }
      }

      if (updateData.sort) {
        URLSPquery.set(key, [value]);
        return setSearchParams(URLSPquery);
      }
      if (prev.includes("")) {
        URLSPquery.set(key, [prev, value]);
      } else {
        URLSPquery.set(key, [value]);
      }
      setSearchParams(URLSPquery);
    } // %2C === ,
  };
  const clearAll = () => {
    if (URLSPquery.has("tab")) {
      return setSearchParams(`tab=${URLSPquery.get("tab")}`);
    } else {
      return setSearchParams(`tab=cookbooks`);
    }
  };
  return { query, updateQuery, clearAll };
}
