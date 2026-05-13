import { ListItemButton, styled } from "@mui/material";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: "8px",
  marginBottom: theme.spacing(1),
  width: "100%",

  // Khi chính nó (Button) có class .Mui-selected
  "&.Mui-selected": {
    backgroundColor: "rgba(25, 118, 210, 0.08)", // Thêm màu nền nhạt cho đẹp
    color: theme.palette.primary.main,

    // Tìm thằng con Icon bên trong nó để nhuộm màu
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },

    // Giữ màu khi hover vào mục đã chọn
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.12)",
    },
  },
}));

export default StyledListItemButton;
