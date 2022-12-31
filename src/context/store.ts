import { configureStore } from "@reduxjs/toolkit";
import cartCounterReducer from "./shoppingCartCounter";
import cartStateReducer from "./ShoppingCart";

export const store = configureStore({
  reducer: {
    counter: cartCounterReducer,
    cart: cartStateReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
