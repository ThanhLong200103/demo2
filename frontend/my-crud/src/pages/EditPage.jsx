import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axiosClient from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
 
  const [form, setForm] = useState({
    name: "",
    price: "",
    img: "",
    quantity: "",
  });
  useEffect(() => {
    const fechProduct = async () =>{
   try {
     const data = await axiosClient.get(`/product/${id}`);
    console.log(data[0])
    setForm(data[0])
       } catch (error) {
    console.log(error)
    
   }
    }
    fechProduct();
  },[id]);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.put(`/product/edit/${id}`, form);

      toast.success("Update Product thành công ");

      setForm({
        name: "",
        price: "",
        img: "",
        quantity: "",
      });

      navigate("/");
    } catch (err) {
      const status = err.response?.status;

      if (status === 400) {
        const errors = err.response?.data?.errors;

        if (Array.isArray(errors)) {
          errors.forEach((msg) => toast.error(msg));
        } else {
          toast.error("Dữ liệu không hợp lệ");
        }
      } else {
        console.log("ERROR:", err);
      }
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Update Product</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập giá"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>IMG</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập img"
            name="img"
            value={form.img}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập so luong"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </div>
  );
}
