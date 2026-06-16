import { Button, Col, Container } from "react-bootstrap";

export default function PaymentSuccess(params) {
    return(
        <>
        <h1>Thanh toán thành công!</h1>
        <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xử lý thành công.</p>
       <Container>
        <Col>
         <Button className="" as="a" href="/" variant="primary">
            Quay về trang chủ
        </Button>
        </Col>
       </Container>
        </>
    )
};
