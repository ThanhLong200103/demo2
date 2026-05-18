import { Container, Grid2, Typography } from "@mui/material";
import ButtonCustomer from "../user/ButtonUser";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddIcon from "@mui/icons-material/Add";


type Props = {
  handleAdd: () => void;
  handleImport: () => void;
  handleExport: () => void;
  title:string
  checkAdd: boolean;

};

export const HandleLogic = ({
  handleAdd,
  handleImport,
  handleExport,
  title,
  checkAdd,
 
  
}: Props) => {
  return (
    <Container sx={{ marginTop: "46px" }}>
      <Grid2 container>
        <Grid2 size={6}>
          <Typography variant="h4">
            {title}
          </Typography>

          <Grid2
            sx={{
              marginTop: "8px",
              display: "flex",
              gap: 2,
            }}
          >
            <ButtonCustomer
              text="Import"
              icon={<FileUploadOutlinedIcon />}
              onClick={handleImport}
            />

            <ButtonCustomer
              text="Export"
              icon={<FileDownloadOutlinedIcon />}
              onClick={handleExport}
            />
          </Grid2>
        </Grid2>

        <Grid2
          size={6}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {checkAdd && (
            <ButtonCustomer
              text="Add"
              icon={<AddIcon />}
              sx={{
                backgroundColor:
                  "rgba(25, 118, 210, 0.08)",
              }}
              onClick={handleAdd}
            />
          )}
        </Grid2>
      </Grid2>
     
    </Container>
  );
};