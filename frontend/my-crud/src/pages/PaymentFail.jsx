import { Button, Col, Container } from "react-bootstrap";

export default function PaymentFail() {
    return(
        <>
        <h1>Thanh toán thất bại!</h1>
        <p>Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại sau.</p>
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
