import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { GetNotificationsResponse } from "../../types/notification";
import { GetNotifications } from "./data";

type Props = {
  setOpenNotification: (open: boolean) => void;
  show: boolean;
  notificationsData: GetNotificationsResponse[];
  setNotificationsData: React.Dispatch<
    React.SetStateAction<GetNotificationsResponse[]>
  >;
  total: number;
  limit: number;
};

export default function NotificationComponent({
  setOpenNotification,
  show,
  notificationsData,
  total,
  limit,
  setNotificationsData,
}: Props) {
  if (!show) return null;

  const handleLoadMore = async () => {
    limit += 10;
    const data = await GetNotifications(limit);
    const notifications = data?.notifications || [];
    setNotificationsData(notifications);
  };

  return (
    <Container
      sx={{
        position: "absolute",
        top: 60,
        right: 20,
        width: 450,
        zIndex: 9999,
        overflowY: "auto",
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
          <Typography variant="h6">Thông báo</Typography>

          <IconButton size="small" onClick={() => setOpenNotification(false)}>
            <CloseIcon />
          </IconButton>
        </div>

        <List sx={{ maxHeight: 400, overflowY: "auto" }}>
          {notificationsData?.map((item) => (
            <ListItem
              key={item._id}
              sx={{
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ListItemText primary={item.title} secondary={item.content} />
            </ListItem>
          ))}
          {notificationsData.length < total && (
            <Box
              sx={{
                p: 1.5,
                borderTop: "1px solid #eee",
                textAlign: "center",
              }}
            >
              <Button
                fullWidth
                variant="text"
                onClick={() => {
                  handleLoadMore();
                }}
              >
                Xem thêm
              </Button>
            </Box>
          )}
        </List>
      </Paper>
    </Container>
  );
}
