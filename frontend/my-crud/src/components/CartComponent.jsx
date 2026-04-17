import { Button, Col, Container, Row } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import "../styles/cart.css"
import { useDispatch } from "react-redux";
import { closeCart } from "../redux/features/cart";
import { Link } from "react-router-dom";
export default function CartComponent({open}) {
    const d = useDispatch()
    return(
        <>

        <Container className={` cart ${open ? "active" :"" }`}>
            <Row style={{ background: "" }}>
          <div className="d-flex justify-content-between  py-1 border-bottom fs-3 px-4 fw-bold ">
            <Col className="mt-2">Giỏ hàng</Col>
            <Col className="text-end ">
              <Button
                className="bg-white border-0 text-black fs-2"
                onClick={() => {
                  d(closeCart(false))
                }}
              >
                <IoCloseOutline />
              </Button>
            </Col>
          </div>
        </Row>
        <Row>
            <img src="//theme.hstatic.net/200000690725/1001078549/14/cart_banner_image.jpg?v=1069" alt="" />
        </Row>
        <Row className="text-center">
            <div className=" fs-3">
                Chưa có sản phẩm trong giỏ hàng...
            </div>
            <div className="pt-3 d-flex justify-content-evenly">
                <p><Link>Trở về trang sản phẩm</Link></p>
                <p><Link>Khuyến mãi dành cho bạn</Link></p>
            </div>
        </Row>
        </Container>
        </>
    )
};
