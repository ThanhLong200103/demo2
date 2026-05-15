import { createSlice } from '@reduxjs/toolkit';

type ThemeMode = "light" | "dark";

interface ThemeState {
  setmode: ThemeMode;
}

const initialState: ThemeState = {
  setmode:
    (localStorage.getItem("mode") as ThemeMode) ||
    "light",
};
const DarkMode = createSlice(
    {
        name:"darkmode",
        initialState,
        reducers:{
            setDark:(state , action)=>{
                state.setmode=action.payload
                localStorage.setItem("mode",action.payload)
            }
        }
    }
)

export const {setDark} = DarkMode.actions
export default DarkMode.reducer