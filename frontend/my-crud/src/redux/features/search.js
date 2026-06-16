import { createSlice } from '@reduxjs/toolkit';


const searchRedux = createSlice(
    {
        name:"search",
        initialState:{ showSearch: false },
        reducers:{
            openSearch :(state ,action)=>{
                state.showSearch = action.payload
            },
            closeSearch:(state , action)=>{
                state.showSearch = action.payload
            }
        }

    }
) 

export const {openSearch , closeSearch} = searchRedux.actions
export default searchRedux.reducer