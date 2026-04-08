import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../api/axios";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function OrderPage() {
  const location = useLocation();
  const { totalPrice, selectedIds } = location.state || {};
  const [orderItems, setOrderItems] = useState([]);
    const navigate = useNavigate();
  
  //  console.log(location)
  //   console.log(totalPrice, selectedIds);
  useEffect(() => {
    const checkItemOder = async () => {
      try {
        if (selectedIds.length > 0) {
          const data = await axiosClient.post("/order/getItemOrder", {
            ids: selectedIds,
          });
          setOrderItems(data);
          //   console.log(data)
          //   console.log(orderItems);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkItemOder();
  }, []);
  useEffect(() => {
    console.log(orderItems);
  }, [orderItems]);
  const handleOrder = async () => {
    try {
      const pay = await axiosClient.post("/order/create", {
        cartItemIds: selectedIds,
        totalPrice: totalPrice,
      });
      console.log(pay);
      toast.success("Đặt hàng thành công");
      navigate("/")
    } catch (error) {
      console.log(error);
      toast.error("Đặt hàng thất bại");
    }
  };
  return (
    <>
      <Container className="py-5">
        <h3 className="fw-bold mb-4">Xác nhận đơn hàng</h3>

        {orderItems.map((item) => (
          <Card key={item.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={2}>
                  <img src={item.img} alt={item.name} className="img-fluid" />
                </Col>

                <Col md={6}>
                  <h6>{item.name}</h6>
                  <p>Số lượng: {item.quantity}</p>
                </Col>

                <Col md={4} className="text-end text-danger fw-bold">
                  {(item.price * item.quantity).toLocaleString()} đ
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}

        <div className="d-flex justify-content-between align-items-center">
          <h5>
            Tổng tiền:{" "}
            <span className="text-danger">
              {totalPrice?.toLocaleString()} đ
            </span>
          </h5>

          <Button
            variant="danger"
            onClick={() => {
              handleOrder();
            }}
          >
            Xác nhận đặt hàng
          </Button>
        </div>
      </Container>
    </>
  );
}
