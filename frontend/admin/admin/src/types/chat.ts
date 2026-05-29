export type RoomChatType = {
    id: number;
    type: string;
    other_user_name: string;
    other_user_id: number;
    last_message: string;
    last_message_time: string;
}
export type MessageType = {
  sender: {
    user_id: number;
    name: string;
  };
  _id: string;
  room_id: number;
  content: string;
  message_type: "text" | "image" | "video" | "file";
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

export interface UserAddChatType {
  name: string;
  role_name: string;
  id: number;

}