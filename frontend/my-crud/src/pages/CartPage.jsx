import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaUser, FaEnvelope, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import axiosClient from "../api/axios";

const CustomCartItem = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const cartRun = async () => {
      const cartData = await axiosClient.get("/cartitem");
      setCart(cartData);
      console.log(cart);
    };
    cartRun();
  }, []);
  const handleDeleteCart = async (id) => {
    try {
      await axiosClient.delete(`/cartitem/delete/${id}`);
    } catch (err) {
        console.log(err)
    }
  };
  return (
    <Container className="p-3 d-flex align-items-center">
      <Row className="w-100 justify-content-center">
        {cart.map((c) => (
          <Col md={8}>
            <Card className="shadow border-0 p-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={12} md={6}>
                    <div className="d-flex align-items-center mb-2">
                      <FaUser className="text-primary me-2" />
                      <h5 className="mb-0 fw-bold">{c.user.name}</h5>
                    </div>
                    <div className="d-flex align-items-center text-muted">
                      <FaEnvelope className="me-2" size={14} />
                      <small>{c.user.email}</small>
                    </div>
                  </Col>

                  <Col xs={8} md={4} className="mt-3 mt-md-0">
                    <div className="d-flex align-items-center">
                      <Button variant="outline-secondary" size="sm">
                        <FaMinus size={10} />
                      </Button>
                      <Form.Control
                        type="text"
                        value={c.quantity}
                        readOnly
                        className="text-center mx-2"
                        style={{ width: "50px", fontWeight: "bold" }}
                      />
                      <Button variant="outline-secondary" size="sm">
                        <FaPlus size={10} />
                      </Button>
                    </div>
                  </Col>

                  <Col xs={4} md={2} className="text-end mt-3 mt-md-0">
                    <Button
                      variant="danger"
                      className="rounded-circle p-2"
                      onClick={() => {
                        handleDeleteCart(c.id);
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CustomCartItem;
