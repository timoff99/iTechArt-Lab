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
        query: (_id) => ({ url: `update`, method: "put", data: _id }),
        invalidatesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
      deleteRecipe: builder.mutation({
        query: (_id) => ({ url: `delete`, method: "delete", data: _id }),
        invalidatesTags: [{ type: "Recipe", id: "RECIPE" }],
      }),
    };
  },
});
