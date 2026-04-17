import { createSlice } from '@reduxjs/toolkit';


const cartRedux = createSlice(
    {
        name:"cart",
        initialState:{ showCart: false },
        reducers:{
            openCart :(state ,action)=>{
                state.showCart = action.payload
            },
            closeCart:(state , action)=>{
                state.showCart = actzAion.payload
            }
        }

    }
) 

export const {openCart , closeCart} = cartRedux.actions
export default cartRedux.reducer