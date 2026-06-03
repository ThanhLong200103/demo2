 import { configureStore } from '@reduxjs/toolkit';
import DarkMode from "./features/darkMode";
import authSlice from "./features/auth"
import  addRoom from '../redux/features/addroom';
import NotificationSlice from "../redux/features/notification"
const store = configureStore({
    reducer: {
        darkmode: DarkMode,
        auth:authSlice,
        dataRoom:addRoom,
        notification:NotificationSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
