import { configureStore } from "@reduxjs/toolkit";
import authAccessReducer from "./features/authAccess";

const store = configureStore({
  reducer: {
    auth: authAccessReducer,
  },
});

export default store;