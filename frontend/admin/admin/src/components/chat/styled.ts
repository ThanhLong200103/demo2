import {

  ListItemButton,
  Typography,
  Box,
  styled,
  Grid2,
  TextField
} from "@mui/material";

export const ChatItem = styled(ListItemButton)(() => ({
  borderRadius: "14px",
  padding: "12px 16px",
  marginBottom: "8px",
  alignItems: "flex-start",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "#f5f7fb",
    transform: "translateY(-1px)",
  },
}));

export const ChatContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflow: "hidden",

}));

export const UserName = styled(Typography)(({theme}) => ({
  fontSize: "15px",
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: "4px",
}));

 export const LastMessage = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#6b7280",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));


export const ChatSidebar = styled(Grid2)(() => ({
  height: "50vh",
  overflowY: "auto",
  borderRight: "1px solid #e5e7eb",
  padding: "8px",

  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#cbd5e1",
    borderRadius: "10px",
  },

  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
}));





export const ChatContainer = styled(Box)(({theme}) => ({
  height: "40vh",
  overflowY: "auto",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  background: theme.palette.background.default,

  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#cbd5e1",
    borderRadius: "10px",
  },
}));

export const MessageRow = styled(Box)<{ isMe: boolean }>(({ isMe }) => ({
  display: "flex",
  justifyContent: isMe ? "flex-start" : "flex-end",
}));

export const MessageBubble = styled(Box)<{ isMe: boolean }>(({ isMe }) => ({
  maxWidth: "70%",
  padding: "10px 14px",
  borderRadius: "16px",
  backgroundColor: isMe ? "#e5e7eb" : "#2563eb",
  color: isMe ? "#111827" : "#fff",
  wordBreak: "break-word",
  boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
}));

export const MessageTime = styled(Typography)(() => ({
  fontSize: "11px",
  marginTop: "4px",
  opacity: 0.7,
}));

export const ChatInputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "16px",
  borderTop: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.default,
}));

export const ChatInput = styled(TextField)(() => ({
  flex: 1,
}));