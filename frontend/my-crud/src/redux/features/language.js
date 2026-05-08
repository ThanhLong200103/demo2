import { createSlice } from '@reduxjs/toolkit';


const Language = createSlice(
    {
        name:"language",
        initialState:{ currentLanguage: localStorage.getItem("i18nextLng") ||"vi" },
        reducers:{
            changeLanguageLocal :(state ,action)=>{
                state.currentLanguage = action.payload
            }
           
        }

    }
) 

export const {changeLanguageLocal} = Language.actions
export default Language.reducer