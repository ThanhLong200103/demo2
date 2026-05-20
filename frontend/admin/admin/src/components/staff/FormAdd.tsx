import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { RoleType } from "../../types/role";
import { getRole } from "./data";
import { RepositoryFactory } from "../../service/FactoryService";
import type { FormDataCreate } from "../../types/user";

type Props ={
  handleClose:()=>void
}

export default function FormCustomers({handleClose}:Props) {
  const [formData, setFormData] = useState<FormDataCreate>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role_id: 0,
  });

  const [role, setRole] = useState<Array<RoleType>>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await RepositoryFactory.get("user").createCustomer(
      formData
     )

     setFormData(
      {
        name: "",
    email: "",
    phone: "",
    password: "",
    role_id: 0,
      }
     )
      handleClose()
     
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const effectData = async () => {
      try {
        const data = await getRole();
        setRole(data);
      } catch (error) {
        console.log(error);
      }
    };
    effectData();
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 400,
        display: "flex",
        flexDirection: "column",

        gap: 2,
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

      <TextField
        select
        label="Role"
        name="role_id"
        value={formData.role_id}
        onChange={handleChange}
        fullWidth
      >
        {role?.map((r) => (
          <MenuItem
            value={r.id}
            key={r.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              py: 1,
            }}
          >
            <Typography fontWeight={600}>{r.name}</Typography>

            <Typography variant="caption" color="text.secondary">
              {r.description}
            </Typography>
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}
