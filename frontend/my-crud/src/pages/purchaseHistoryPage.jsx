import { useEffect, useState } from "react";
import axiosClient from "../api/axios";
import { Badge, Button, Card, Col, Container, Row, Toast } from "react-bootstrap";
import { toast } from "react-toastify";

export default function PurchaseHistoryPage() {
  const [orderItem, setOrderItem] = useState([]);
  useEffect(() => {
    const Order = async () => {
      try {
        const res = await axiosClient.get("/order");

        // console.log(res)
        const flatData = res.flat();
        setOrderItem(flatData);
      } catch (err) {
        console.log(err);
      }
    };
    Order();
  }, []);
  useEffect(() => {
    console.log(orderItem);
  }, [orderItem]);
  const handleCancel = async (itemId) => {
    try {
      const idOrderItem = itemId;
      const cancel = await axiosClient.post("/order/cancel", { idOrderItem });
      console.log(cancel);
      Toast.success("Hủy đơn hàng thành công");
      setOrderItem((prevItems) =>
        prevItems.filter((item) =>
          item.id !== itemId
        )
      );
    } catch (error) {
      console.log(error);
      Toast.error("Hủy đơn hàng thất bại");
    }
  };
  return (
    <>
      <Container className="py-5">
        <h3 className="fw-bold mb-4">Lịch sử giao dịch</h3>

        {orderItem.map((item) => (
          <Card key={item.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={2}>
                  <img src={item.img} alt={item.name} className="img-fluid" />
                </Col>

                <Col md={6}>
                  <h6>{item.name}</h6>
                  <p>Số lượng: {item.quantity}</p>
                  <div className="mb-0">
                    Trạng thái:{" "}
                    <Badge
                      bg={
                        item.status === "delivered"
                          ? "success"
                          : item.status === "cancelled"
                            ? "danger"
                            : item.status === "shipped"
                              ? "info"
                              : item.status === "returned"
                                ? "warning"
                                : "secondary"
                      }
                    >
                      {item.status === "pending"
                        ? "Chờ xử lý"
                        : item.status === "shipped"
                          ? "Đang giao"
                          : item.status === "delivered"
                            ? "Đã giao"
                            : item.status === "cancelled"
                              ? "Đã hủy"
                              : item.status === "returned"
                                ? "Trả hàng"
                                : item.status}
                    </Badge>
                  </div>
                </Col>

                <Col md={4} className="text-end text-danger fw-bold">
                  <div className="text-danger fw-bold mb-2">
                    {(item.price * item.quantity).toLocaleString()} đ
                  </div>

                
                {
                  item.status === "pending" ?   <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {handleCancel(item.id)}}
                  >
                    Hủy món này
                  </Button> :  ""
                }
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
}
