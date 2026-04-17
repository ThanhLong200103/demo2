import { configureStore } from "@reduxjs/toolkit";
import authAccessReducer from "./features/authAccess";
import sideBarReducer from "./features/sideBar"
import cartReducer from"./features/cart"
import searchReducer from "./features/search"
const store = configureStore({
  reducer: {
    auth: authAccessReducer,
    sideBar :sideBarReducer,
    cart:cartReducer,
    search:searchReducer
  },
});

export default store;