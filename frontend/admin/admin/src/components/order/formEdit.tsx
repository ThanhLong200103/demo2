import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getOneOrder, updatePriceOrder } from "./data";
import type { OrderPriceUpdate } from "../../types/order";

type Props = {
  id: string;
  handleClose: () => void;
};

export default function FormEditOrder({ id, handleClose }: Props) {
  const [formData, setFormData] = useState<OrderPriceUpdate>({
    id: "",
    total_price: 0,
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
      console.log({
        id,
        total_price: Number(formData.total_price),
      });

      await updatePriceOrder(formData);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOneOrder(id);
        console.log(data);
        setFormData({
          id: id,
          total_price: data?.total_price,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 400,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 3,
      }}
    >
      <TextField label="Order ID" value={id} disabled fullWidth />

      <TextField
        label="Total Price"
        name="total_price"
        type="number"
        value={formData.total_price || ""}
        onChange={handleChange}
        fullWidth
      />

      <Button type="submit" variant="contained">
        Update Price
      </Button>
    </Box>
  );
}
