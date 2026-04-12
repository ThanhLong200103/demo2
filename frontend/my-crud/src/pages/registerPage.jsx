import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import axiosClient from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate()
  const handleChange = (e)=>{
     setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  const handleRegister = async (e)=>{
     e.preventDefault();
     console.log(data)
    try {
         const register = await axiosClient.post("/register" ,data)
     toast.success("Tạo tài khoản thành công")
     navigate("/login")
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || "Tạo tài khoản thất bại")
    }
  }
  return (
    <>
      <Container className="d-flex justify-content-center mt-5">
        <Col md={8}>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name"value={data.name} name="name"
            onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={data.password} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Email" name="email" value={data.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Phone"  name="phone" value={data.phone } onChange={handleChange}/>
            </Form.Group>
             <Button variant="primary" type="submit" >Đăng Ký</Button>
          </Form>
         
        </Col>
      </Container>
    </>
  );
}
