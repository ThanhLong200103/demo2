import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import type { RegisterUser } from "../../types/user";
import { registerUser } from "./data";

type Props = {
  handleClose: () => void;
};

export default function FormUserCreate({ handleClose }: Props) {
  const [formData, setFormData] = useState<RegisterUser>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log(formData);
      await registerUser(formData);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        paddingTop: "36px",
      }}
    >
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
      />

      <Button type="submit" variant="contained">
        Thêm
      </Button>
    </Box>
  );
}
