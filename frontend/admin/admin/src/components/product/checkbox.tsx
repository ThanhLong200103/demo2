import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid2,
  Slider,
  Typography,
} from "@mui/material";
import { useState } from "react";

type Props = {
  size: string[];
  color: string[];
};
function valuetext(value: number) {
  return `${value}đ`;
}
export default function CheckBoxProduct({ size, color }: Props) {
  const [value, setValue] = useState([0, 0]);

  const handleChange = (newValue: number[]) => {
    setValue(newValue);
  };

  return (
    <Grid2
      size={{ lg: 3, md: 12 }}
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        backgroundColor: "rgba(243, 245, 247, 0.08)",
        padding: "0 36px",
      }}
    >
      <Box
        component={"div"}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <FormGroup>
          <Typography variant="h6" sx={{ padding: "8px" }}>
            Size
          </Typography>
          {size.map((z) => (
            <FormControlLabel control={<Checkbox />} label={z} />
          ))}
        </FormGroup>
        <FormGroup>
          <Typography variant="h6" sx={{ padding: "8px" }}>
            Color
          </Typography>
          {color.map((c) => (
            <FormControlLabel control={<Checkbox />} label={c} />
          ))}
        </FormGroup>
      </Box>
      <Typography variant="h6">Giá tiền</Typography>
      <Box sx={{ width: "90%", margin: "auto" }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={(_, newValue) => {
            handleChange(newValue as number[]);
          }}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
      <FormGroup>
        <Typography variant="h6">Trạng thái</Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControlLabel control={<Checkbox />} label={"Còn hàng"} />
          <FormControlLabel control={<Checkbox />} label={"Hết hàng"} />
        </Box>
      </FormGroup>
    </Grid2>
  );
}
