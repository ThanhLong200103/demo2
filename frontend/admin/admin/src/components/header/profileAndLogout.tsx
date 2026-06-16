import { Container, Grid2, IconButton } from "@mui/material";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

type Props = {
  show: boolean;

  handleProfile: () => void;
  handleLogout: () => void;
};
export default function ProfileAndLogout({
  show,
  handleProfile,
  handleLogout,
}: Props) {
  return (
    <Container
      sx={(theme) => ({
        display: show ? "block" : "none",

        minHeight: "50px",
        minWidth: "150px",
        position: "absolute",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
        right: -30,
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        zIndex: 100,
      })}
    >
    
      <Grid2
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "5px",
        }}
      >
         <IconButton
          onClick={handleProfile}
        >
          <ContactEmergencyIcon />
        </IconButton>

        <IconButton
          onClick={handleLogout}
        >
          <PowerSettingsNewIcon />
        </IconButton>

      </Grid2>
    </Container>
  );
}
