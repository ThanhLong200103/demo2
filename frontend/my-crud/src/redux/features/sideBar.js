import { createSlice } from '@reduxjs/toolkit';


const sideBar = createSlice(
    {
        name:"sideBar",
        initialState:{ showSideBar: false },
        reducers:{
            openSideBar :(state ,action)=>{
                state.showSideBar = action.payload
            },
            closeSideBar :(state , action)=>{
                state.showSideBar = action.payload
            }
        }

    }
) 

export const {openSideBar , closeSideBar} = sideBar.actions
export default sideBar.reducer