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

export default function HeaderComponent() {

  const [check , setCheck] = useState(false);
  const  dispatch = useDispatch()
  const handleDarkMode = () => {
  const newCheck = !check;
  setCheck(newCheck);
  if(newCheck){
    dispatch(setDark("dark"))
  }else{
    dispatch(setDark("light"))

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
        <Grid2 container sx={{
           display:"flex",
          justifyContent:"space-between"
        }}>
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
              <li>
                <Button>
                  <Badge badgeContent={1} color="primary">
                    <NotificationsNoneIcon color="primary" />
                  </Badge>
                </Button>
              </li>
              <li>
                <Button>
                  <ManageAccountsIcon />
                </Button>
              </li>
              <li>
                <Switch
                  checked={check}
                  slotProps={{ input: { "aria-label": "controlled" } }}
                  onClick={()=>{
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
