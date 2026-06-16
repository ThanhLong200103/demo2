import { createSlice } from "@reduxjs/toolkit";

const addressRedux = createSlice({
  name: "address",
  initialState: { showAddress: false, addressAll: [] ,addressTrue:[] },
  reducers: {
    openAddress: (state, action) => {
      state.showAddress = action.payload;
    },
    closeAddress: (state, action) => {
      state.showAddress = action.payload;
    },
    setAddressAll:(state , action)=>{
        state.addressAll = action.payload
    },
    setAddressTrue:(state , action)=>{
        state.addressTrue = action.payload
    }
  },
});

export const {openAddress ,closeAddress,setAddressAll  ,setAddressTrue} = addressRedux.actions
export default addressRedux.reducer