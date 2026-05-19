import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { RoleType } from "../../types/role";
import { getOneCustomer, getRole } from "./data";
import { RepositoryFactory } from "../../service/FactoryService";
import type { FormDataEdit } from "../../types/user";

type Props = {
  id: string;
};
export default function FormCustomersEdit({ id }: Props) {
  const [formData, setFormData] = useState<FormDataEdit>({
    name: "",
    email: "",
    phone: "",
    role_name: "",
    role_id: 0,
    status: "",
    password:""
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
      console.log (formData)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const effectData = async () => {
      try {
        const data = await getRole();
        setRole(data);
        const res = await getOneCustomer(id);
        console.log(res);
        setFormData(res[0]);
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
        select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        fullWidth
      >
      <TextField
        select
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
      ></TextField>
        <MenuItem
          value="active"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            py: 1,
          }}
        >
          <Typography fontWeight={600}>active</Typography>

          <Typography variant="caption" color="text.secondary">
            User is active
          </Typography>
        </MenuItem>

        <MenuItem
          value="deleted"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            py: 1,
          }}
        >
          <Typography fontWeight={600}>deleted</Typography>

          <Typography variant="caption" color="text.secondary">
            User is deleted
          </Typography>
        </MenuItem>
      </TextField>
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
