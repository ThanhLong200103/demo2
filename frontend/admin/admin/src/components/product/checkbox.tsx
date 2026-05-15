import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid2,
  Typography,
} from "@mui/material";

type Props = {
  size: string[];
  color: string[];
};

export default function CheckBoxProduct({ size, color }: Props) {
  return (
    <Grid2
      size={{ lg: 3, md: 12 }}
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        backgroundColor: "rgba(243, 245, 247, 0.08)",
      }}
    >
      <Box
        component={"div"}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <FormGroup>
          <Typography variant="h6">Size</Typography>
          {size.map((z) => (
            <FormControlLabel control={<Checkbox />} label={z} />
          ))}
        </FormGroup>
        <FormGroup>
          <Typography variant="h6">Color</Typography>
          {color.map((c) => (
            <FormControlLabel control={<Checkbox />} label={c} />
          ))}
        </FormGroup>
      </Box>
    </Grid2>
  );
}
