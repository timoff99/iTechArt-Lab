import { createApi } from "@reduxjs/toolkit/query/react";
import api from "./api.service.js";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const result = await api({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["cookBookComments", "recipeComments"],
  endpoints(builder) {
    return {
      createCookBookComments: builder.mutation({
        query: (message, parent_id) => ({ url: `cookbook-comments/create`, method: "post", data: message, parent_id }),
        invalidatesTags: [{ type: "cookBookComments", id: "COOKBOOKCOMMENTS" }],
      }),
      createRecipeComments: builder.mutation({
        query: (message, parent_id) => ({ url: `recipe-comments/create`, method: "post", data: message, parent_id }),
        invalidatesTags: [{ type: "recipeComments", id: "RECIPECOMMENTS" }],
      }),
    };
  },
});

export const { useCreateCookBookCommentsMutation, useCreateRecipeCommentsMutation } = commentsApi;
