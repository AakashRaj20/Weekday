import { configureStore } from "@reduxjs/toolkit";
import jobsApiSlice  from "./slices/jobsApiSlice";

export const store = configureStore({
  reducer: {
    jobsApi: jobsApiSlice,
  },
});
