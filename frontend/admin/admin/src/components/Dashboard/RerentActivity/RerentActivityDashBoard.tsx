import {
  Avatar,
  Box,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import TableOrderDashboard from "./TableOrderDashboard";
import { StyledButonUser } from "../../user/styled";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { StyledGridRerentActivity } from "../styled";
export default function RerentActivityDashBoard() {
  const rows = [
    {
      order: "#1001",
      customer: "Nguyễn Văn An",
      date: "2026-05-01",
      status: "Pending",
    },
    {
      order: "#1002",
      customer: "Trần Thị Bình",
      date: "2026-05-02",
      status: "Completed",
    },
    {
      order: "#1003",
      customer: "Lê Minh Hoàng",
      date: "2026-05-03",
      status: "Cancelled",
    },
    {
      order: "#1004",
      customer: "Phạm Quốc Huy",
      date: "2026-05-04",
      status: "Processing",
    },
    {
      order: "#1005",
      customer: "Đỗ Thị Lan",
      date: "2026-05-05",
      status: "Completed",
    },
    {
      order: "#1006",
      customer: "Hoàng Đức Nam",
      date: "2026-05-06",
      status: "Pending",
    },
    {
      order: "#1007",
      customer: "Võ Thanh Tùng",
      date: "2026-05-07",
      status: "Shipped",
    },
    {
      order: "#1008",
      customer: "Ngô Khánh Linh",
      date: "2026-05-08",
      status: "Completed",
    },
  ];

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
      price: 32990000,
      category: "Smartphone",
    },
    {
      id: 2,
      name: "MacBook Air M3",
      image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
      price: 28990000,
      category: "Laptop",
    },
    {
      id: 3,
      name: "AirPods Pro 2",
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46",
      price: 5990000,
      category: "Accessory",
    },
    {
      id: 4,
      name: "Samsung Galaxy S25",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
      price: 24990000,
      category: "Smartphone",
    },
    {
      id: 5,
      name: "iPad Pro M4",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      price: 26990000,
      category: "Tablet",
    },
    {
      id: 6,
      name: "Sony WH-1000XM5",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      price: 8990000,
      category: "Headphone",
    },
  ];
  return (
    <>
      <Grid2
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <StyledGridRerentActivity
          size={{ md: 4, xs: 12 }}
        >
          <Typography
            variant="h6"
            sx={{
              padding: "18px",
              marginBottom: "18px",
            }}
          >
            Sản phẩm mới nhất
          </Typography>

          {products.map((p) => (
            <List
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <ListItem
                sx={{
                  maxHeight: "58px",
                
                }}
              >
                <ListItemButton sx={{ display: "flex", gap: "18px" ,}}>
                  <Avatar src={p.image}></Avatar>
                  <Box>
                    <ListItemText>{p.name}</ListItemText>
                    <Typography sx={{ fontSize: "12px" }}>
                      Updated Jun 26, 2025
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            </List>
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <StyledButonUser
              sx={{
                marginTop: "18px",
              }}
            >
              <Typography>View all </Typography>
              <ArrowForwardIcon sx={{ fontSize: "" }} />
            </StyledButonUser>
          </Box>
        </StyledGridRerentActivity>
        <StyledGridRerentActivity
          size={{ md: 7, xs: 12 }}
         
        >
          <Typography
            variant="h6"
            sx={{
              padding: "18px",
              borderBottom: "1px solid #52595a",
            }}
          >
            Đơn hàng mới nhất
          </Typography>
          <TableOrderDashboard rows={rows}></TableOrderDashboard>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <StyledButonUser
              sx={{
                marginTop: "18px",
              }}
            >
              <Typography>View all </Typography>
              <ArrowForwardIcon sx={{ fontSize: "" }} />
            </StyledButonUser>
          </Box>
        </StyledGridRerentActivity>
      </Grid2>
    </>
  );
}
