import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axiosClient from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../services/FactoryService";

export default function CreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    img: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await RepositoryFactory.get("product").create(form);

      toast.success("Tạo user thành công ");

      setForm({
        name: "",
        price: "",
        img: "",
        quantity: "",
      });

      navigate("/");
    } catch (err) {
      const status = err.response?.status;

      if (status === 422) {
        const errors = err.response?.data?.error;
        if (typeof errors === "object" && errors !== null) {
          Object.values(errors).forEach((msg) => toast.error(msg));
        } else {
          toast.error(errors || "Lỗi xác thực dữ liệu");
        }
      } else if (status === 400) {
        toast.error(err.response?.data?.message || "Dữ liệu không hợp lệ");
      } else if (status === 500) {
        toast.error("Lỗi máy chủ, vui lòng thử lại sau");
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
      }
      console.log("ERROR:", err);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Create Product</h2>

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
          Tạo Product
        </Button>
      </Form>
    </div>
  );
}
