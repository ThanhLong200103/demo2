import { createSlice } from "@reduxjs/toolkit"


const getAuthFromLS = () => {
  const token = localStorage.getItem('accessToken');
  return {
    token: token || null,
    isAuthenticated: !!token,
  };
};
const authSlice = createSlice(
    {
      name: 'auth',
  initialState: getAuthFromLS(),
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
    },
  },
    }
)

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer