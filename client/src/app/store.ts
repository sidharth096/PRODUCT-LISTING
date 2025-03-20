import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

// Infer the RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
