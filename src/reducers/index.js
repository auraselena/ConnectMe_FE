import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./usersReducer";
import { contentReducer } from "./contentReducer";

export const globalStore = configureStore({
  reducer: {
    usersReducer,
    contentReducer,
  },
});
