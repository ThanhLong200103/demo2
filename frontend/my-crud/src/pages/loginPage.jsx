import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import axiosClient from "../api/axios";
import { useNavigate } from "react-router-dom";

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
    localStorage.setItem ('id', data.id);

    navigation("/")
   } catch (error) {
    console.log(error)
   }
  }

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Col md={8}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Name"  
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
  );
}