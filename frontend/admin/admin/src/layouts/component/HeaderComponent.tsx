import {
  Badge,
  Box,
  Button,
  Container,
  Grid2,
  InputAdornment,
  Switch,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDark } from "../../redux/features/darkMode";
import ProfileAndLogout from "../../components/header/profileAndLogout";
import { RepositoryFactory } from "../../service/FactoryService";
import { logout } from "../../redux/features/auth";
import { useSocket } from "../../context/SocketContext";
import NotificationComponent from "../../components/header/notification";
import { setDataNotification } from "../../redux/features/notification";
import type { GetNotificationsResponse } from "../../types/notification";
import { GetNotifications } from "../../components/header/data";

export default function HeaderComponent() {
  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { socket } = useSocket() as any;
  const [notifications, setNotifications] = useState(false);
  const [notificationsData, setNotificationsData] = useState<GetNotificationsResponse[]>([]);
  const {dataNotification} = useSelector((state :any)=>state.notification)
  const [totalNotification , setTotalNotification] = useState<number>(0)
  let limit = 10;
    const { lastMessage } = useSocket();
  const handleDarkMode = () => {
    const newCheck = !check;
    setCheck(newCheck);
    if (newCheck) {
      dispatch(setDark("dark"));
    } else {
      dispatch(setDark("light"));
    }
  };

  const handleProfile = () => {
    alert("Profile clicked!");
    console.log("profile");
  };
  const handleLogout = async () => {
    try {
      await RepositoryFactory.get("auth").logout();
      socket.disconnect();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fechData = async () => {
      try {
        
        const data = await GetNotifications(limit);
        const notifications = data?.notifications || [];
        setNotificationsData(notifications);
        setTotalNotification(data?.total ||0)
        dispatch(setDataNotification(data?.total));
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fechData();
  }, []);

  useEffect(() => {
    if (lastMessage?.event === "new_notification") {
      const newNotification = lastMessage.data as GetNotificationsResponse;
      console.log("New message received via WebSocket:", newNotification);
      setNotificationsData((p: GetNotificationsResponse[]) => {
        const isDuplicate = p.some((msg) => msg._id === newNotification._id); // Thay 'id' bằng key định danh của message nếu cần
        if (isDuplicate) return p;

        const updated = [...p, newNotification].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        dispatch(setDataNotification(totalNotification +1));
        return updated;

      });
    }
  }, [lastMessage]);


  return (
    <>
      <Container
        sx={{
          width: "75%",
          position: "absolute",
          borderBottom: "1px solid #ccc",
          maxHeight: "64px",
          right: "0",
        }}
      >
        <Grid2
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid2 size={6}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm..."
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 10,
                  maxHeight: "32px",
                  marginTop: "16px",
                },
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <Box
              component={"ul"}
              sx={{
                listStyle: "none",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <li>
                <Button>
                  <LanguageIcon />
                </Button>
              </li>
              <li style={{ position: "relative" }}>
                <Button onClick={() => setNotifications(!notifications)}>
                  <Badge badgeContent={dataNotification} color="primary">
                    <NotificationsNoneIcon color="primary" />
                  </Badge>
                </Button>
                <NotificationComponent
                  setOpenNotification={setNotifications}
                  show={notifications}
                  notificationsData={notificationsData}
                  total={totalNotification}
                  limit = {limit}
                  setNotificationsData={setNotificationsData}
                />
              </li>
              <li style={{ position: "relative" }}>
                <Button
                  onClick={() => {
                    setShow((s) => !s);
                  }}
                >
                  <ManageAccountsIcon />
                </Button>
                <ProfileAndLogout
                  show={show}
                  handleProfile={handleProfile}
                  handleLogout={handleLogout}
                ></ProfileAndLogout>
              </li>
              <li>
                <Switch
                  checked={check}
                  slotProps={{ input: { "aria-label": "controlled" } }}
                  onClick={() => {
                    handleDarkMode();
                  }}
                />
              </li>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
