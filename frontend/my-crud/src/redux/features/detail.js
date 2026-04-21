import { createSlice } from '@reduxjs/toolkit';


const detailProduct = createSlice(
    {
        name:"detailProduct",
        initialState:{ showDetail: false },
        reducers:{
            openDetail :(state ,action)=>{
                state.showDetail = action.payload
            },
            closeDetail :(state , action)=>{
                state.showDetail = action.payload
            }
        }

    }
) 

export const {openDetail , closeDetail} = detailProduct.actions
export default detailProduct.reducer