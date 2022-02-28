import { createApi } from "@reduxjs/toolkit/query/react";

import api from "./api.service.js";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      // console.log("a", `recipe/${url}`, method, data, params);
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
      getAllRecipes: builder.query({
        query: () => ({ url: `get-all-recipes`, method: "get" }),
        providesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      getUserRecipes: builder.query({
        query: () => ({ url: `get-user-recipes`, method: "get" }),
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
        query: (timeRange) => ({ url: `get-filtered-recipes`, method: "get", params: timeRange }),
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
  useGetAllRecipesQuery,
  useGetUserRecipesQuery,
  useLazyGetRecipeQuery,
  useGetRecipeQuery,
  useGetRecipeWithoutCookBookQuery,
  useGetFilteredRecipesQuery,
  useUpdateRecipeCommentsMutation,
  useUpdateRecipeCookBookIdMutation,
  useUpdateRecipeMutation,
  useUpdateRecipeLikesMutation,
  useDeleteRecipesCookBookIdMutation,
  useDeleteRecipeMutation,
} = recipeApi;
