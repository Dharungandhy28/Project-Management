import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Slice/tasksSlice";

export const Store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
