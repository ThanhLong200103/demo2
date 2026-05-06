import { createSlice } from '@reduxjs/toolkit';


const cartRedux = createSlice(
    {
        name:"cart",
        initialState:{ showCart: false ,countItem:0 ,cartItems :[]  , cartLocal:JSON.parse(localStorage.getItem("pendingCart")) || []},
        reducers:{
            openCart :(state ,action)=>{
                state.showCart = action.payload
            },
            closeCart:(state , action)=>{
                state.showCart = action.payload
            },
            indexCountItem :(state , action)=>{
                state.countItem = action.payload
            },
            setCartItem : (state , action)=>{
                state.cartItems = action.payload
            },
            setCartLocal : (state , action)=>{
                state.cartLocal = action.payload.cartLocal
            }
        }

    }
) 

export const {openCart , closeCart ,indexCountItem ,setCartItem ,setCartLocal } = cartRedux.actions
export default cartRedux.reducer