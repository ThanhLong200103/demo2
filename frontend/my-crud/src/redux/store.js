import { configureStore } from "@reduxjs/toolkit";
import authAccessReducer from "./features/authAccess";
import sideBarReducer from "./features/sideBar"
import cartReducer from"./features/cart"
import searchReducer from "./features/search"
import detailReducer from"./features/detail"
import languageReducer from "./features/language"
import AddressReducer from "./features/address"
const store = configureStore({
  reducer: {
    auth: authAccessReducer,
    sideBar :sideBarReducer,
    cart:cartReducer,
    search:searchReducer,
    detail:detailReducer,
    language:languageReducer,
    address:AddressReducer
  },
});

export default store;