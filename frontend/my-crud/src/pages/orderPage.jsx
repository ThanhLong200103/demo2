import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../api/axios";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../services/FactoryService";

export default function OrderPage() {
  const location = useLocation();
  const { totalPrice, selectedIds } = location.state || {};
  const [orderItems, setOrderItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  //  console.log(location)
  //   console.log(totalPrice, selectedIds);
  useEffect(() => {
    const checkItemOder = async () => {
      try {
        if (selectedIds.length > 0) {
          const data = await RepositoryFactory.get("order").getItemOrder(selectedIds );
          setOrderItems(data);
            // console.log(data)
            // console.log(orderItems);
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

      const pay = await RepositoryFactory.get("order").create({
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
  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleOnlinePayment = async () => {
    try {
      
      const pay = await RepositoryFactory.get("vnpay").createPayment({
        cartItemIds: selectedIds,
        totalPrice: totalPrice,
      });
      console.log(pay);
      const orderId = pay[0];
      console.log(orderId);
     toast.success("Đã chuyển hướng đến cổng thanh toán");
    navigate("/payment", { state: { orderId: orderId ,totalPrice: totalPrice } });
    } catch (error) {
      console.log(error);
      toast.error("Thanh toán thất bại");
    }
  }
  return (
    <>
  <Container className="py-5" style={{ maxWidth: "800px" }}>
    <h3 className="fw-bold mb-4">Xác nhận đơn hàng</h3>

  
    <div className="mb-4">
      <h5 className="mb-3">Sản phẩm đã chọn</h5>
      {orderItems.map((item) => (
        <Card key={item.id} className="mb-2 border-0 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={3} md={2}>
                <img src={item.img} alt={item.name} className="img-fluid rounded" />
              </Col>
              <Col xs={5} md={6}>
                <h6 className="mb-0">{item.name}</h6>
                <small className="text-muted">Số lượng: {item.quantity}</small>
              </Col>
              <Col xs={4} md={4} className="text-end text-danger fw-bold">
                {(item.price * item.quantity).toLocaleString()} đ
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>


    <Card className="mb-4 shadow-sm border-0">
      <Card.Body>
        <h5 className="mb-3">Phương thức thanh toán</h5>
        <Form>
          <div className="p-3 border rounded mb-2">
            <Form.Check
              type="radio"
              id="payment-cod"
              label={
                <div className="ms-2">
                   <strong>Thanh toán khi nhận hàng (COD)</strong>
                   <br/><small className="text-muted">Giao hàng và thu tiền tận nơi</small>
                </div>
              }
              name="paymentMethod"
              value={"COD"}
              onChange={handleChange}
              defaultChecked
            />
          </div>
          <div className="p-3 border rounded">
            <Form.Check
              type="radio"
              id="payment-online"
              label={
                <div className="ms-2">
                   <strong>Thanh toán trực tuyến</strong>
                   <br/><small className="text-muted">Qua cổng VNPAY (Thẻ ATM, QR Code, Visa/Master)</small>
                </div>
              }
              value={"VNPAY"}
              name="paymentMethod"
              onChange={handleChange}
            />
          </div>
        </Form>
      </Card.Body>
    </Card>


    <Card className="shadow-sm border-0 bg-light">
      <Card.Body className="d-flex justify-content-between align-items-center py-4">
        <div>
          <span className="text-muted">Tổng cộng:</span>
          <h3 className="text-danger fw-bold mb-0">
            {totalPrice?.toLocaleString()} đ
          </h3>
        </div>
       { paymentMethod === "COD" ?  <Button
          variant="danger"
          size="lg"
          className="px-5 fw-bold"
          onClick={handleOrder}
        >
          Xác nhận đặt hàng COD
        </Button>:<Button
          variant="danger"
          size="lg"
          className="px-5 fw-bold"
          onClick={handleOnlinePayment}
   
        >
          Xác nhận đặt hàng VNPAY
        </Button>}
      </Card.Body>
    </Card>
  </Container>
</>
  );
}
