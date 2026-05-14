import { InputAdornment, ListItemIcon, type TextFieldProps } from "@mui/material";// Import cái styled(TextField) bạn viết lúc nãy

import type { ReactElement } from "react";
import { SearchUser } from "./styled";

type UserSearchProps = TextFieldProps & {
  placeholder?: string;
  icon?:ReactElement
};

const SearchUserPage = ({ placeholder,icon, ...props }: UserSearchProps) => {
  return (
    <SearchUser
      placeholder={placeholder} 
      {...props} 
      slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  {icon && <ListItemIcon >{icon}</ListItemIcon>}
                </InputAdornment>
              ),
            },
          }}
    />
  );
};

export default SearchUserPage