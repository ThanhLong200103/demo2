import { Button, Col, Container, Row } from "react-bootstrap";
import { MdOutlineAddShoppingCart } from "react-icons/md";

export default function ProductComponent({ products }) {
  console.log(products);
  return (
    <>
      <Container fluid>
        <Row className="d-flex justify-content-center  mb-4 ">
          {products.map((product) => (
            <Col
              md={4}
              xs={6}
              lg={2}
              className=" bg-white  justify-content-center"
              key={product.id}
            >
              <div className=" position-relative">
                <div>
                  <img
                    src={
                      product.img }
                    alt={product.name}
                    className="w-100"
                  />
                </div>
                <div className=" pt-1 d-flex flex-wrap  flex-column text-center">
                  <p className="">Số lượng: {product.quantity}</p>
                  <p className="fs-6">{product.name}</p>
                  <div className="d-flex justify-content-center">
                    <p className="text-danger fw-bold pe-2 pt-1">
                      {product.price.toLocaleString()}đ
                    </p>
                    <p className="border border-dark rounded p-1">
                      <MdOutlineAddShoppingCart />
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
