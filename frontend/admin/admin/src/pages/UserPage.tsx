import {
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ButtonCustomer from "../components/User/ButtonUser";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SearchUserPage from "../components/User/SreachUser";

export default function UserPage() {
  return (
    <>
      <Container sx={{ marginTop: "46px" }}>
        <Grid container>
          <Grid size={6}>
            <Typography variant="h4">Customers</Typography>
            <Grid
              sx={{
                marginTop: "8px",
              }}
            >
              <ButtonCustomer
                text="Import"
                icon={<FileUploadOutlinedIcon />}
              ></ButtonCustomer>
              <ButtonCustomer
                text="Export"
                icon={<FileDownloadOutlinedIcon />}
              ></ButtonCustomer>
            </Grid>
          </Grid>
          <Grid
            size={6}
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <ButtonCustomer
              text="add"
              icon={<AddIcon />}
              sx={{
                backgroundColor: "rgba(25, 118, 210, 0.08)",
              }}
            ></ButtonCustomer>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <SearchUserPage placeholder="Search customer" icon={<SearchIcon />} ></SearchUserPage>
      </Container>
      <Container>

      </Container>
    </>
  );
}
