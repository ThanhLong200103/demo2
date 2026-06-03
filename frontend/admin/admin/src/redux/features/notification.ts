import { createSlice } from "@reduxjs/toolkit"


interface ListNotification {
    dataNotification :number
}

const initialState:ListNotification ={
    dataNotification:0
}

const NotificationSlice = createSlice(
    {
      name: 'notification',
  initialState,
  reducers: {
    setDataNotification: (state, action) => {
      state.dataNotification = action.payload;
    },
  },
    }
)

export const { setDataNotification } = NotificationSlice.actions;
export default NotificationSlice.reducer