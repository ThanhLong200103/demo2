import {
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";

type Props = {
  valueEmail: string;
  valuePassword: string;
  setValuePassword: (value: string) => void;
  setValueEmail: (value: string) => void;
  handleLogin: () => void;
};

export default function LoginComponent({
  valueEmail,
  valuePassword,
  setValuePassword,
  setValueEmail,
  handleLogin,
}: Props) {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 10 }}>
        <Stack spacing={3}>
          <Typography variant="h4" textAlign="center">
            Login
          </Typography>

          <TextField
            label="Email"
            fullWidth
            value={valueEmail}
            onChange={(e) => setValueEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={valuePassword}
            onChange={(e) => setValuePassword(e.target.value)}
          />

          <Button variant="contained" size="large" onClick={handleLogin}>
            Login
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
