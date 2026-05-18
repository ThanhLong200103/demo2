import { Button, Container, Grid2 } from "@mui/material";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

type Props = {
  show: boolean;
  setShow: (value: boolean) => void;
};
export default function ProfileAndLogout({ show, setShow }: Props) {
  return (
    <Container
      sx={{
        display: show ? "block" : "none",
        position:"absolute",
        minWidth :"200px",
        minHeight:"200px",

      }}
      
    >
      <Grid2 container>
        <Grid2>
          <Button>
            <ContactEmergencyIcon />
          </Button>
        </Grid2>
        <Grid2>
          <PowerSettingsNewIcon />
        </Grid2>
      </Grid2>
    </Container>
  );
}
