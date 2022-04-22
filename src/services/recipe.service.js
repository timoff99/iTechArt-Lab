import { createApi } from "@reduxjs/toolkit/query/react";

import api from "./api.service.js";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const result = await api({ url: `recipe/${url}`, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Recipe"],
  endpoints(builder) {
    return {
      addRecipe: builder.mutation({
        query: (recipesData) => ({ url: `create`, method: "post", data: recipesData }),
        invalidatesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      addRecipeClone: builder.mutation({
        query: (_id) => ({ url: `create-clone`, method: "post", data: { _id } }),
        invalidatesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      addRecipeCloneWithoutTag: builder.mutation({
        query: (_id) => ({ url: `create-clone`, method: "post", data: { _id } }),
      }),
      getUserRecipes: builder.query({
        query: (page, search) => ({ url: `get-user-recipes`, method: "get", params: page, search }),
        providesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      getRecipe: builder.query({
        query: (_id) => ({ url: `get`, method: "get", params: _id }),
        providesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      getRecipeWithoutCookBook: builder.query({
        query: () => ({ url: `get-recipe-without-cookbook`, method: "get" }),
        providesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      getFilteredRecipes: builder.query({
        query: (type, timeRange, page, sort, search) => ({
          url: `get-filtered-recipes`,
          method: "get",
          params: type,
          timeRange,
          page,
          sort,
          search,
        }),
        providesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      getRecipesForMain: builder.query({
        query: (limit, type) => ({
          url: `get-recipes-for-main`,
          method: "get",
          params: limit,
          type,
        }),
        providesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      updateRecipeComments: builder.mutation({
        query: (card_id, comment_id) => ({ url: `update-recipe-comments`, method: "put", data: card_id, comment_id }),
        invalidatesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),

      updateRecipeCookBookId: builder.mutation({
        query: (selectedRecipes, _id) => ({
          url: `update-recipe-cookbookid`,
          method: "put",
          data: selectedRecipes,
          _id,
        }),
        invalidatesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      updateRecipe: builder.mutation({
        query: (recipesData) => ({ url: `update`, method: "put", data: recipesData }),
        invalidatesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      updateRecipeLikes: builder.mutation({
        query: (_id) => ({ url: `update-likes`, method: "put", params: _id }),
        invalidatesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      deleteRecipesCookBookId: builder.mutation({
        query: (selectedRecipes, _id) => ({
          url: `delete-recipe-cookbookid`,
          method: "delete",
          data: selectedRecipes,
          _id,
        }),
        invalidatesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      deleteRecipe: builder.mutation({
        query: (_id) => ({ url: `delete`, method: "delete", params: _id }),
        invalidatesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
    };
  },
});

export const {
  useAddRecipeMutation,
  useAddRecipeCloneMutation,
  useAddRecipeCloneWithoutTagMutation,
  useLazyGetUserRecipesQuery,
  useLazyGetRecipeQuery,
  useGetRecipeWithoutCookBookQuery,
  useLazyGetFilteredRecipesQuery,
  useGetRecipesForMainQuery,
  useLazyGetRecipesForMainQuery,
  useUpdateRecipeCommentsMutation,
  useUpdateRecipeCookBookIdMutation,
  useUpdateRecipeMutation,
  useUpdateRecipeLikesMutation,
  useDeleteRecipesCookBookIdMutation,
  useDeleteRecipeMutation,
} = recipeApi;
