import { createSlice } from '@reduxjs/toolkit';


const DarkMode = createSlice(
    {
        name:"darkmode",
        initialState:{setmode:'light'},
        reducers:{
            setDark:(state , action)=>{
                state.setmode=action.payload
            }
        }
    }
)

export const {setDark} = DarkMode.actions
export default DarkMode.reducer