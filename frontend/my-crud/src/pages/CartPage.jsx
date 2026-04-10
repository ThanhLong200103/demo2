import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import { FaUser, FaTrash, FaPlus, FaMinus, FaShoppingCart, FaCreditCard } from "react-icons/fa";
import axiosClient from "../api/axios";
import { Link } from "react-router-dom";
import OrderPage from "./orderPage";

const CustomCartItem = () => {
  const [cart, setCart] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

 
const totalPrice = useMemo(() => {
  return cart
    .filter((item) => selectedIds.includes(item.id)) 
    .reduce((sum, item) => {
      // Lấy giá và số lượng MỚI NHẤT từ biến cart
      return sum + (item.price * item.quantity);
    }, 0);
}, [cart, selectedIds]);

  const handelIncrease = async (id, currentQty) => {
    const newQty = currentQty + 1;
   
    try {
      await axiosClient.put(`/cartitem/update/${id}`, { quantity: newQty, quantityProduct: -1 });
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)));

    } catch (error) { console.log(error); }
  };
  console.log(totalPrice)
  console.log(selectedIds)
  const handleReduce = async (id, currentQty) => {
    if (currentQty <= 1) return;
    const newQty = currentQty - 1;
   
    try {
      
      await axiosClient.put(`/cartitem/update/${id}`, { quantity: newQty, quantityProduct: 1 });
       setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)));
    } catch (error) { console.log(error); }
  };

  useEffect(() => {
    const cartRun = async () => {
      try {
        const response = await axiosClient.get("/cart");
        console.log("Cart data:", response);
        const cartItemData = await axiosClient.get(`/cartitem/${response.id}`);
        console.log(cartItemData);
        setCart(cartItemData);
      } catch (error) { console.error("Lỗi API Cart:", error); }
    };
    cartRun();
  }, []);

  const handleDeleteCart = async (id) => {
    try {
      await axiosClient.delete(`/cartitem/delete/${id}`);
      setCart((s) => s.filter((item) => item.id !== id));
      setSelectedIds((s) => s.filter((itemId) => itemId !== id));
    } catch (err) { console.log(err); }
  };

  const handleCheck = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <>
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", pb: "100px" }}>
      <Container className="py-5">
        <h3 className="mb-4 fw-bold"><FaShoppingCart className="me-2"/> Giỏ hàng của bạn</h3>
        <Row className="justify-content-center">
          <Col lg={9}>
            {cart.map((c) => (
              <Card key={c.id} className="mb-3 border-0 shadow-sm overflow-hidden" style={{ borderRadius: "15px" }}>
                <Card.Body className="p-0">
                  <Row className="align-items-center g-0">
                
                    <Col xs={1} className="d-flex justify-content-center border-end">
                      <Form.Check 
                        type="checkbox"
                        checked={selectedIds.includes(c.id)}
                        onChange={() => handleCheck(c.id)}
                        style={{ transform: "scale(1.3)" }}
                      />
                    </Col>

             
                    <Col xs={3} md={2} className="p-2">
                      <img 
                        src={c.img } 
                        alt={c.name}
                        className="img-fluid rounded"
                        style={{ objectFit: "cover", height: "80px", width: "100%" }}
                      />
                    </Col>

            
                    <Col xs={8} md={5} className="p-3">
                      <h6 className="fw-bold mb-1">{c.name}</h6>
                      <div className="text-danger fw-bold">
                        {(c.price*c.quantity)?.toLocaleString()} <small>đ</small>
                      </div>
                    </Col>

   
                    <Col xs={7} md={3} className="p-3 d-flex justify-content-center">
                      <div className="d-flex align-items-center border rounded-pill px-2 bg-light">
                        <Button variant="link" className="text-dark p-0" onClick={() => handleReduce(c.id, c.quantity)}>
                          <FaMinus size={12} />
                        </Button>
                        <Form.Control
                          type="text"
                          value={c.quantity}
                          readOnly
                          className="text-center bg-transparent border-0 fw-bold mx-1"
                          style={{ width: "40px",paddingLeft: "10px" }}
                        />
                        <Button variant="link" className="text-dark p-0" onClick={() => handelIncrease(c.id, c.quantity)}>
                          <FaPlus size={12} />
                        </Button>
                      </div>
                    </Col>

                  
                    <Col xs={5} md={1} className="text-center p-3">
                      <Button variant="outline-danger" size="sm" className="border-0" onClick={() => handleDeleteCart(c.id)}>
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>


      <div className="fixed-bottom bg-white border-top shadow-lg p-3" style={{ zIndex: 1030 }}>
        <Container>
          <Row className="align-items-center">
            <Col xs={6} md={8}>
              <div className="d-flex align-items-center">
                <Form.Check 
                  type="checkbox" 
                  label="Chọn tất cả" 
                  className="me-4 d-none d-md-block"
                  checked={selectedIds.length === cart.length && cart.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) setSelectedIds(cart.map(i => i.id));
                    else setSelectedIds([]);
                  }}
                />
                <div className="ms-md-auto text-end me-4">
                  <span className="text-muted d-block d-md-inline me-md-2">Tổng thanh toán ({selectedIds.length} sản phẩm):</span>
                  <span className="text-danger fs-4 fw-bold">{totalPrice?.toLocaleString()} đ</span>
                </div>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <Button 
                variant="danger" 
                size="lg" 
                className="w-100 fw-bold py-2 shadow-sm" 
                disabled={selectedIds.length === 0}
                style={{ borderRadius: "10px" }}
                as={Link}  to={`/order`}
                state={{totalPrice , selectedIds}}
              >
                Đặt hàng 
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
   
    </>
  );
};

export default CustomCartItem;