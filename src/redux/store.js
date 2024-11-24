import { configureStore } from "@reduxjs/toolkit";
import slices from "./slices";

export const store = configureStore({
  reducer: slices,
  devTools: import.meta.env.MODE == "development",
});
