import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { cookBookApi } from "../services/cookbook.service";
import { recipeApi } from "../services/recipe.service";
import { commentsApi } from "../services/comments.service";
import { cookbookCollectionApi } from "../services/cookbookCollection.service";

export const store = configureStore({
  reducer: {
    [cookBookApi.reducerPath]: cookBookApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [cookbookCollectionApi.reducerPath]: cookbookCollectionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cookBookApi.middleware,
      recipeApi.middleware,
      commentsApi.middleware,
      cookbookCollectionApi.middleware
    ),
});
setupListeners(store.dispatch);
