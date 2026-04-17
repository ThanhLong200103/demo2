import { Button, Col, Container, Row } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutgoingMail } from "react-icons/md";
import { TbPhoneCall } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { closeSideBar } from "../redux/features/sideBar";
import "../styles/sideBar.css";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CgMathMinus } from "react-icons/cg";
export default function SideBarComponent({ isOpen }) {
  const d = useDispatch();
  const [showShirt, setShowShirt] = useState(true);
  const [showTrousers, setShowTrousers] = useState(true);
  const [showAccessory, setShowAccessory] = useState(true);

  const hanleCloseSideBar = () => {
    d(closeSideBar(false));
  };
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""} `}
        onClick={hanleCloseSideBar}
      ></div>
      <Container className={`d-lg-none slide ${isOpen ? "active" : ""}`}>
        <Row style={{ background: "" }}>
          <div className="d-flex justify-content-between  py-4 border-bottom fs-3 px-4 fw-bold ">
            <Col>Danh mục</Col>
            <Col className="text-end">
              <Button
                className="bg-white border-0 text-black fs-2"
                onClick={() => {
                  hanleCloseSideBar();
                }}
              >
                <IoCloseOutline />
              </Button>
            </Col>
          </div>
        </Row>
        <Row className="border-bottom  ">
          <Col>
            <div>
              <ul
                className="list-unstyled fw-bold ps-3"
                style={{ cursor: "pointer" }}
              >
                <li className="py-3 fs-4">
                  <Link to="/" className="text-black text-decoration-none">
                    Sản phẩm mới
                  </Link>
                </li>
                <li className="py-3 fs-4">
                  <Link to="/sale" className="text-black text-decoration-none">
                    Danh mục sale
                  </Link>
                </li>
                <li className="py-3 fs-4 position-relative">
                  <Link
                    to="/shirts"
                    className="text-black text-decoration-none"
                  >
                    Áo nam
                  </Link>
                  <span
                    className="position-absolute top-0 bottom-0 mt-3 me-3"
                    style={{ right: "0" }}
                    onClick={() => {
                      setShowShirt((item) => !item);
                    }}
                  >
                    {showShirt ?  <IoIosAdd />:<CgMathMinus /> }
                  </span>
                  <ul
                    className={`list-unstyled fw-light fs-5  ${showShirt && "d-none"}`}
                  >
                    <li className="m-3">
                      <Link
                        to="/shirts/polo"
                        className="text-black text-decoration-none"
                      >
                        Áo Polo
                      </Link>
                    </li>
                    <li className="m-3">
                      <Link
                        to="/shirts/thun"
                        className="text-black text-decoration-none"
                      >
                        Áo Thun
                      </Link>
                    </li>
                    <li className="m-3">
                      <Link
                        to="/shirts/somi"
                        className="text-black text-decoration-none"
                      >
                        Áo sơ mi
                      </Link>
                    </li>
                    <li className="m-3">
                      <Link
                        to="/shirts/ni"
                        className="text-black text-decoration-none"
                      >
                        Áo - Quần Nỉ
                      </Link>
                    </li>
                    <li className="m-3">
                      <Link
                        to="/shirts/blazer"
                        className="text-black text-decoration-none"
                      >
                        Áo Blazer
                      </Link>
                    </li>
                    <li className="m-3">
                      <Link
                        to="/shirts/len"
                        className="text-black text-decoration-none"
                      >
                        Áo Len
                      </Link>
                    </li>
                    <li className="m-3">
                      <Link
                        to="/shirts/khoac"
                        className="text-black text-decoration-none"
                      >
                        Áo Khoác
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="py-3 fs-4 position-relative text-black ">
                  <Link to="/pants" className="text-black text-decoration-none">
                    Quần nam
                  </Link>
                  <span
                    className="position-absolute top-0 bottom-0 mt-3 me-3"
                    style={{ right: "0" }}
                    onClick={() => {
                      setShowTrousers((item) => !item);
                    }}
                  >
                    {showTrousers ? <IoIosAdd />:<CgMathMinus />}
                  </span>

                  <ul
                    className={`list-unstyled fw-light fs-5 ${showTrousers && "d-none"}`}
                  >
                    <li className="m-3">
                      <Link
                        to="/pants/short"
                        className="text-black text-decoration-none"
                      >
                        Quần Short
                      </Link>
                    </li>
                    <li className="m-3">
                      <Link
                        to="/pants/jeans"
                        className="text-black text-decoration-none"
                      >
                        Quần Jeans
                      </Link>
                    </li>
                    <li className="m-3">
                      <Link
                        to="/pants/au"
                        className="text-black text-decoration-none"
                      >
                        Quần Âu
                      </Link>
                    </li>
                    <li className="m-3">
                      <Link
                        to="/pants/gio"
                        className="text-black text-decoration-none"
                      >
                        Quần Gió
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="py-3 fs-4  position-relative">
                  <Link
                    to="/accessories"
                    className="text-black text-decoration-none"
                  >
                    Phụ kiện
                  </Link>
                  <span
                    className="position-absolute top-0 bottom-0 mt-3 me-3"
                    style={{ right: "0" }}
                    onClick={() => {
                      setShowAccessory((item) => !item);
                    }}
                  >
                    {showAccessory ? <IoIosAdd />:<CgMathMinus />}
                  </span>
                <ul
                    className={`list-unstyled fw-light fs-5 ${showAccessory && "d-none"}`}
                  >
                    <li className="m-3">
                      <Link
                        to="/accessories/belt"
                        className="text-black text-decoration-none"
                      >
                        Thắt Lưng
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="py-3 fs-4">
                  <Link
                    to="/stores"
                    className="text-black text-decoration-none"
                  >
                    Hệ thống cửa hàng
                  </Link>
                </li>
                <li className="py-3 fs-4">
                  <Link
                    to="/warnings"
                    className="text-black text-decoration-none"
                  >
                    CẢNH BÁO LỪA ĐẢO
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row className="p-3">
          <div className="fs-3">
            <p>BẠN CẦN HỖ TRỢ?</p>
          </div>
          <div className="d-flex gap-3 fs-3  ">
            <p>
              <TbPhoneCall />
            </p>
            <a
              href="tel:0964942121"
              className=" text-decoration-none text-black fs-5 mt-2"
            >
              0964.942.121
            </a>
          </div>
          <div className="d-flex gap-3 fs-4 ">
            <p>
              <MdOutgoingMail />
            </p>
            <a
              href="maito:cskh@torano.vn"
              className=" text-decoration-none text-black fs-5 mt-1"
            >
              cskh@torano.vn
            </a>
          </div>
        </Row>
      </Container>
    </>
  );
}
