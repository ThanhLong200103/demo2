import { Container } from "@mui/material";
import SearchUserPage from "../User/SreachUser";
import SearchIcon from "@mui/icons-material/Search";
type Props = {
  valueSearch: string;
  placeholder: string;
  setValueSearch: React.Dispatch<React.SetStateAction<string>>;
};
export const SearchLogic = ({
  valueSearch,
  placeholder,
  setValueSearch,
  ...props
}: Props) => {
  return (
    <Container>
      <SearchUserPage
        {...props}
        placeholder={placeholder}
        value={valueSearch}
        onChange={(e) => setValueSearch(e.target.value)}
        icon={<SearchIcon />}
      ></SearchUserPage>
    </Container>
  );
};
