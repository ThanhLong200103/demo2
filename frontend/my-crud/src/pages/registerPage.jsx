import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import axiosClient from "../api/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { RepositoryFactory } from "../services/FactoryService";

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
         const register = await RepositoryFactory.get("user").register(data);
     toast.success("Tạo tài khoản thành công")
     navigate("/login")
    } catch (error) {
       const status = error.response?.status;
      const apiData = error.response?.data;
      const validationErrors = apiData?.error;

      if (status === 422) {
        if (validationErrors?.email) {
          toast.error(validationErrors.email);
        }
        if (validationErrors?.password) {
          toast.error(validationErrors.password);
        }
          if (validationErrors?.name) {
          toast.error(validationErrors.name);
        }
          if (validationErrors?.phone) {
          toast.error(validationErrors.phone);
        }
         if (!validationErrors?.email && !validationErrors?.password && !validationErrors?.name && !validationErrors?.phone) {
          toast.error(apiData?.message || "Đã có lỗi xảy ra");
        }
      } else {
        toast.error(apiData?.message || "Đã có lỗi xảy ra");
      }
    }
  }
  return (
    <>
      <Container className="d-flex justify-content-center mt-5 mb-5">
        <Col md={8} xs={6}>
          <Form onSubmit={handleRegister} className="mb-3">
            <Form.Group  className="mb-3 " controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control  type="text" placeholder="Name"value={data.name} name="name"
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
             <Button className="mt-5" variant="danger" type="submit" >Đăng Ký</Button>
          </Form>
         <p>Bạn đã có tài khoản ?</p>
         <Link to="/login  " >Đăng nhập ngay</Link>
        </Col>
      </Container>
    </>
  );
}
