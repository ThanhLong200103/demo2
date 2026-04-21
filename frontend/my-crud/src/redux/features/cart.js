import { createSlice } from '@reduxjs/toolkit';


const cartRedux = createSlice(
    {
        name:"cart",
        initialState:{ showCart: false ,countItem:0},
        reducers:{
            openCart :(state ,action)=>{
                state.showCart = action.payload
            },
            closeCart:(state , action)=>{
                state.showCart = action.payload
            },
            indexCountItem :(state , action)=>{
                state.countItem = action.payload
            }
        }

    }
) 

export const {openCart , closeCart ,indexCountItem } = cartRedux.actions
export default cartRedux.reducer