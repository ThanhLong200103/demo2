import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MessageType, RoomChatType } from "../../types/chat";

interface RoomState {
  dataRoom: RoomChatType[];
addtextMessage: MessageType[];
}




const initialState: RoomState = {
  dataRoom:[],
  addtextMessage:[]
};

const addRoom = createSlice({
  name: "addRoom",
  initialState,
  reducers: {
    setDataRoom: (
      state,
      action: PayloadAction<RoomChatType[]>
    ) => {
      state.dataRoom = action.payload;
    },
    setaddTextMessage: (
      state,
      action: PayloadAction<MessageType[]>
    ) => {
       state.addtextMessage = action.payload;
    },
  },
});

export const { setDataRoom, setaddTextMessage } = addRoom.actions;
export default addRoom.reducer;