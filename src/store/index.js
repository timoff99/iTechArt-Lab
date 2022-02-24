import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { cookBookApi } from "../services/cookbook.service";
import { recipeApi } from "../services/recipe.service";
import { commentsApi } from "../services/comments.service";

export const store = configureStore({
  reducer: {
    [cookBookApi.reducerPath]: cookBookApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cookBookApi.middleware, recipeApi.middleware, commentsApi.middleware),
});
setupListeners(store.dispatch);
