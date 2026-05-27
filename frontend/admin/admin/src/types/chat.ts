export type RoomChatType = {
    id: number;
    type: string;
    other_user_name: string;
    other_user_id: number;
    last_message: string;
    last_message_time: string;
}

export type MessageType = {
  content: string;
  created_at: string;
  is_deleted: number;
  room_id: number;
  sender_id: number;
  sender_name: string;
};