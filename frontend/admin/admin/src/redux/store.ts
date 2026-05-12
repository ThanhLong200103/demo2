 import { configureStore } from '@reduxjs/toolkit';
import DarkMode from "./features/darkMode";

const store = configureStore({
    reducer: {
        darkmode: DarkMode
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
