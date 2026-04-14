import { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import {  useLocation } from "react-router-dom";

export default function IndexPagew() {
  const location = useLocation();
  console.log(location);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateUser =  async ()=>{

  }
  useEffect(
    ()=>{
        setData(location.state)
    },[data]
  )
  
  return (
    <>
      <Container className="d-flex justify-content-center mt-5">
        <Col md={8}>
          <Form onSubmit={handleUpdateUser}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={data.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                name="phone"
                value={data.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Container>
    </>
  );
}
