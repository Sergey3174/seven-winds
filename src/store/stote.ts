import { configureStore } from "@reduxjs/toolkit";
import { rowsApi } from "./rowsApi";
import { appSlice } from "./appSlice";

export const store = configureStore({
  reducer: {
    [rowsApi.reducerPath]: rowsApi.reducer,
    app: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rowsApi.middleware),
});
