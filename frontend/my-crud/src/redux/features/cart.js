import { createSlice } from '@reduxjs/toolkit';


const cartRedux = createSlice(
    {
        name:"cart",
        initialState:{ showCart: false ,countItem:0 ,cartItems :[]},
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
            }
        }

    }
) 

export const {openCart , closeCart ,indexCountItem ,setCartItem } = cartRedux.actions
export default cartRedux.reducer