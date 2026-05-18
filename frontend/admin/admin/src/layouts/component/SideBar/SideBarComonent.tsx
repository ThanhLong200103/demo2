import { Box, Grid2, ImageList, ImageListItem, List } from "@mui/material";
import SidebarItem from "../../../components/listItem/SideBarItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useNavigate } from "react-router-dom";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import SideBar from "./styles";

export default function SideBarComonent() {
  const navigate = useNavigate();
  const handleNavigate = (name: String) => {
    navigate(`/${name}`);
  };
  return (
    <>
      <SideBar
        sx={{
          height: "100%",
          width: "25%",
          borderRight: "1px solid #ccc",
          position: "absolute",
          boxShadow: "1px 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Grid2 size={12}>
          <Box component={"div"}>
            <ImageList>
              <ImageListItem>
                <img
                  src="//theme.hstatic.net/200000690725/1001078549/14/logo.png?v=1069"
                  alt="Torano"
                  style={{ maxHeight: "70px" }}
                />
              </ImageListItem>
            </ImageList>
          </Box>
        </Grid2>
        <Grid2 container>
          <List
            sx={{
              width: "100%",
            }}
          >
            <SidebarItem
              label="Dashboard"
              icon={<DashboardIcon />}
              active={true}
              onClick={() => handleNavigate("/Dashboard")}
            ></SidebarItem>
            <SidebarItem
              label="Staff"
              icon={<PersonAddIcon />}
              active={true}
              onClick={() => handleNavigate("/Staff")}
            ></SidebarItem>
            <SidebarItem
              label="Order"
              icon={<CardGiftcardIcon />}
              active={true}
              onClick={() => handleNavigate("/Order")}
            ></SidebarItem>
            <SidebarItem
              label="Product"
              icon={<ShoppingBasketIcon />}
              active={true}
              onClick={() => handleNavigate("/Product")}
            ></SidebarItem>
            <SidebarItem
              label="Customers"
              icon={<PermIdentityIcon />}
              active={true}
              onClick={() => handleNavigate("/User")}
            ></SidebarItem>
            <SidebarItem
              label="System"
              icon={<SettingsIcon />}
              active={true}
              onClick={() => handleNavigate("/System")}
            ></SidebarItem>
          </List>
        </Grid2>
      </SideBar>
    </>
  );
}
