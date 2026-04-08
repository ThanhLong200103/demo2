import { useEffect, useState } from "react"
import axiosClient from "../api/axios";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function PurchaseHistoryPage() {
    const [orderItem,setOrderItem] = useState([]);
    useEffect(
        ()=>{
            const Order = async()=>{
                try {
                    const res = await axiosClient.get("/order");
                    
                    console.log(res)
                 const flatData = res.flat();
                setOrderItem(flatData)
                } catch (err) {
                    console.log(err);
                }  
            }
            Order();
        },[]
    )
    useEffect(()=>{
        console.log(orderItem)
    },[orderItem])
    return(
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
                </Col>

                <Col md={4} className="text-end text-danger fw-bold">
                  {(item.price * item.quantity).toLocaleString()} đ
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>
        </>
    )
};
