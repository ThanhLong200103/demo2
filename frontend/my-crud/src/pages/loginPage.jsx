import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axiosClient from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigation = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
   try {
    const data = await axiosClient.post("/login",{email,password});
    console.log(data)
    localStorage.setItem("accessToken",data.accessToken)
   navigation("/")
   } catch (error) {
    console.log(error)
   }
  }
 useEffect(() => {
  const accessToken = localStorage.getItem("accessToken");

  
  if (accessToken) {
    const checkMe = async () => {
      try {
        await axiosClient.get("/profile");
        navigation("/"); 
      } catch (error) {
        
        console.log("Token expired, attempting refresh...");
      }
    };
    checkMe();
  }
  // Nếu không có token, tuyệt đối KHÔNG gọi gì cả, cứ để họ ở trang Login.
}, []);
  return (
    <>
    <Container className="d-flex justify-content-center mt-5">
      <Col md={8}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Email"  
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
     
    </Container>
    <Container className="mt-3">
      <Link to={"/register"}>Đăng ký tài khoản</Link>
    </Container>
    </>
  );
}