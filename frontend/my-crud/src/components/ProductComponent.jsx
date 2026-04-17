import { Button, Col, Container, Row } from "react-bootstrap";
import { MdOutlineAddShoppingCart } from "react-icons/md";

export default function ProductComponent({ products }) {
  console.log(products);
  return (
    <>
      <Container fluid style={{cursor:"pointer"}}>
        <Row className="d-flex justify-content-center  mb-4  mt-4 ">
          {products.map((product) => (
            <Col
              md={4}
              xs={6}
              lg={2}
              className="bg-white d-flex flex-column"
              key={product.id}
            >
              <div className="w-100 position-relative">
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: "100%", height: "100%" }}
                />
                <p className="position-absolute top-0 border bg-danger text-white text-center  " style={{width:"50px",borderRadius:"10px"}}>-99%</p>
              </div>

              <div className="pt-1 d-flex flex-column flex-grow-1">
                <div className="d-flex justify-content-between">
                  <p className="mb-1">+ màu sắc</p>
                  <p className="mb-1">+ kích thước</p>
                </div>

                <a className="text-decoration-none text-black text-start">
                  {product.name}
                </a>

                <div className="d-flex justify-content-start mt-auto ">
                  <p className="text-danger fw-bold pe-2 pt-1">
                    {product.price.toLocaleString()}đ
                  </p>
                  <p className="p-1 text-decoration-line-through">
                    100,000,000 đ
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
