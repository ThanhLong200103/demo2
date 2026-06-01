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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDark } from "../../redux/features/darkMode";
import ProfileAndLogout from "../../components/header/profileAndLogout";
import { RepositoryFactory } from "../../service/FactoryService";
import { logout } from "../../redux/features/auth";
import { useSocket } from "../../context/SocketContext";
import NotificationComponent from "../../components/header/notification";

export default function HeaderComponent() {
  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { socket  } = useSocket() as any; 
  const [notifications, setNotifications] = useState(false);
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
      dispatch(logout())
    } catch (error) {
      console.log(error);
    }
  };



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
                  <Badge badgeContent={1} color="primary">
                    <NotificationsNoneIcon color="primary" />

                  </Badge>
                </Button>
                <NotificationComponent setOpenNotification={setNotifications} show={notifications} />
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
