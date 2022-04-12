import { createApi } from "@reduxjs/toolkit/query/react";

import api from "./api.service.js";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const result = await api({ url: `cookbook-collection/${url}`, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const cookbookCollectionApi = createApi({
  reducerPath: "cookbookCollectionApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["CookbookCollection"],
  endpoints(builder) {
    return {
      getFourCookbookCollection: builder.query({
        query: () => ({ url: "get-four", method: "get" }),
        providesTags: [{ type: "CookbookCollection", id: "COOKBOOKCOLLECTION" }],
      }),

      getOneCookbookCollection: builder.query({
        query: (id) => ({ url: "get", method: "get", params: id }),
        providesTags: [{ type: "CookbookCollection", id: "COOKBOOKCOLLECTION" }],
      }),
    };
  },
});

export const { useGetFourCookbookCollectionQuery, useLazyGetOneCookbookCollectionQuery } = cookbookCollectionApi;
