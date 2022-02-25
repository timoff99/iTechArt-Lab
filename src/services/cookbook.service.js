import { createApi } from "@reduxjs/toolkit/query/react";
import api from "./api.service.js";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      // console.log("a", `cookbook/${url}`, method, data, params);
      const result = await api({ url: `cookbook/${url}`, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const cookBookApi = createApi({
  reducerPath: "cookBookApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["CookBook"],
  endpoints(builder) {
    return {
      addCookBook: builder.mutation({
        query: (cookbookData) => ({ url: `create`, method: "post", data: cookbookData }),
        invalidatesTags: [{ type: "CookBook", id: "COOKBOOK" }],
      }),
      getAllCookBooks: builder.query({
        query: () => ({ url: `get-all-cookbooks`, method: "get" }),
        providesTags: [{ type: "CookBook", id: "COOKBOOK" }],
      }),
      getUserCookBooks: builder.query({
        query: () => ({ url: `get-user-cookbooks`, method: "get" }),
        providesTags: [{ type: "CookBook", id: "COOKBOOK" }],
      }),
      getCookBook: builder.query({
        query: (_id) => ({ url: `get`, method: "get", params: _id }),
        providesTags: [{ type: "CookBook", id: "COOKBOOK" }],
      }),
      getFilteredCookBook: builder.query({
        query: (query) => ({
          url: `get-filtered-cookbooks`,
          method: "get",
          params: query,
        }),

        providesTags: [{ type: "CookBook", id: "COOKBOOK" }],
      }),
      updateCookBookComments: builder.mutation({
        query: (card_id, comment_id) => ({ url: `update-comments`, method: "put", data: card_id, comment_id }),
        invalidatesTags: [{ type: "CookBook", id: "COOKBOOK" }],
      }),
      updateCookBook: builder.mutation({
        query: (cookbookData) => ({ url: `update`, method: "put", data: cookbookData }),
        invalidatesTags: [{ type: "CookBook", id: "COOKBOOK" }],
      }),
      updateCookBookLikes: builder.mutation({
        query: (_id) => ({ url: `update-likes`, method: "put", params: _id }),
        invalidatesTags: [{ type: "CookBook", id: "COOKBOOK" }],
      }),
      deleteCookBook: builder.mutation({
        query: (_id) => ({ url: `delete`, method: "delete", params: _id }),
        invalidatesTags: [{ type: "CookBook", id: "COOKBOOK" }],
      }),
    };
  },
});

export const {
  useAddCookBookMutation,
  useGetAllCookBooksQuery,
  useGetUserCookBooksQuery,
  useGetCookBookQuery,
  useLazyGetCookBookQuery,
  useGetFilteredCookBookQuery,
  useUpdateCookBookCommentsMutation,
  useUpdateCookBookMutation,
  useUpdateCookBookLikesMutation,
  useDeleteCookBookMutation,
} = cookBookApi;
