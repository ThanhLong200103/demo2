import { createSlice } from '@reduxjs/toolkit';


const detailProduct = createSlice(
    {
        name:"detailProduct",
        initialState:{ showDetail: false , productId : null},
        reducers:{
            openDetail :(state ,action)=>{
                state.showDetail = action.payload.showDetail,
                state.productId = action.payload.productId
            },
            closeDetail :(state , action)=>{
                state.showDetail = action.payload.showDetail,
                state.productId = action.payload.productId
            }
        }

    }
) 

export const {openDetail , closeDetail} = detailProduct.actions
export default detailProduct.reducer