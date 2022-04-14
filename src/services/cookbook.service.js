import { createApi } from "@reduxjs/toolkit/query/react";
import api from "./api.service.js";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
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
      addCookBookClone: builder.mutation({
        query: (_id) => ({ url: `create-clone`, method: "post", data: { _id } }),
        invalidatesTags: [{ type: "CookBook", id: "COOKBOOK" }],
      }),
      getUserCookBooks: builder.query({
        query: (page) => ({ url: `get-user-cookbooks`, method: "get", params: { page } }),
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
      getCookBooksForMain: builder.query({
        query: (limit, type) => ({
          url: `get-cookbooks-for-main`,
          method: "get",
          params: limit,
          type,
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
  useAddCookBookCloneMutation,
  useGetUserCookBooksQuery,
  useLazyGetUserCookBooksQuery,
  useGetCookBookQuery,
  useLazyGetCookBookQuery,
  useGetFilteredCookBookQuery,
  useLazyGetFilteredCookBookQuery,
  useGetCookBooksForMainQuery,
  useUpdateCookBookCommentsMutation,
  useUpdateCookBookMutation,
  useUpdateCookBookLikesMutation,
  useDeleteCookBookMutation,
} = cookBookApi;
