import {
  ListItem,
  ListItemIcon,
  ListItemText,
  type ListItemButtonProps,
} from "@mui/material";
import type { ReactElement } from "react";
import StyledListItemButton from "./styles";


// Định nghĩa props mở rộng từ ListItemButton mặc định
interface SidebarItemProps extends ListItemButtonProps {
  label: string;
  icon?: ReactElement;
  active?: boolean;
}

const SidebarItem = ({ label, icon, active, ...props }: SidebarItemProps) => {
  return (
    <ListItem >
      <StyledListItemButton
        {...props}
        selected={active} // Sử dụng prop selected của MUI
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={label} />
      </StyledListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
