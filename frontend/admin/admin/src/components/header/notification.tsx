import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import type { GetNotificationsResponse } from "../../types/notification";

type Props = {
  setOpenNotification: (open: boolean) => void;
  show: boolean;
};

export default function NotificationComponent({
  setOpenNotification,
  show,
}: Props) {
  if (!show) return null;
  const [notifications, setNotifications] = useState<GetNotificationsResponse[]>([]);
  useEffect(() => {}, []);
  return (
    <Container
      sx={{
        position: "absolute",
        top: 60,
        right: 20,
        width: 350,
        zIndex: 9999,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            borderBottom: "1px solid #eee",
          }}
        >
          <Typography variant="h6">
            Thông báo
          </Typography>

          <IconButton
            size="small"
            onClick={() => setOpenNotification(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <List sx={{ maxHeight: 400, overflowY: "auto" }}>
          {notifications.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ListItemText
                primary={item.title}
                secondary={item.content}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}