import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axios";
import { AiOutlineLogout } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authAccess";
import { RepositoryFactory } from "../services/FactoryService";
import { Col, Row } from "react-bootstrap";
import styles from "../styles/Header.module.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import LoginComponent from "./LoginComponent";
import CustomCartItem from "../pages/CartPage";
export default function HeaderComponent(params) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [userId, setId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showLogin , setShowLogin] = useState(false);
  // const [showCart , setShowCart] = useState(false);


  useEffect(() => {
    if (token) {
      const checkMe = async () => {
        try {
          const user = await RepositoryFactory.get("user").profile();
          console.log(user.id);
          setId(user.id);
          setProfile(user);
        } catch (error) {
          console.log("Token expired, attempting refresh...");
        }
      };
      checkMe();
    }
  }, [token]);

  const handleLogOut = async () => {
    try {
      const logOut = await RepositoryFactory.get("user").logout();
      toast.success("Đã đăng xuất");
      localStorage.removeItem("accessToken");
      dispatch(logout());
      navigate("/login");
      setId(null);
      setProfile(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container fluid  >
        <Row className="align-items-center d-flex justify-content-between bg-dark text-white px-2" >
          <Col md={8}>
            <span className="me-1">
              Hotline mua hàng:
              <a
                href="tel:0964942121"
                className="text-decoration-none text-white me-1 ms-1"
              >
                0964942121
              </a>
              (8:30-21:30, Tất cả các ngày trong tuần)
            </span>

            <span>| Liên hệ</span>
          </Col>

          <Col sm={4} md={2} className="d-flex align-items-center">
            <span>
              <IoMdNotificationsOutline className="mb-1" />
              {/* <span className="">0</span> */}
              Thông báo của tôi
            </span>
          </Col>
        </Row>

        <Row className="align-items-center d-flex justify-content-between pt-3 pb-3 px-2 ">
          <Col md={2} className="d-flex justify-content-center " >
          <Button className="bg-white border-0" as={Link} to={`/`}>
              <img
              src="//theme.hstatic.net/200000690725/1001078549/14/logo.png?v=1069"
              alt="Torano"
              className="img-fluid "
            />
          </Button>
          </Col>
          <Col md={8} className="d-flex justify-content-center flex-wrap  ">
          <Button className="m-2 bg-white text-dark border-0" as={Link} to={`/`}>
            Sản phẩm mới
          </Button>
          <Button className="m-2 bg-white text-dark border-0" as={Link} to={`/sale`}>
            Danh mục sale
          </Button>
          <Button className="m-2 bg-white text-dark border-0" as={Link} to={`/shirts`}>
            Áo Name
          </Button>
          <Button className="m-2 bg-white text-dark border-0" as={Link} to={`/pants`}>
             Quần nam
          </Button>
          <Button className="m-2 bg-white text-dark border-0" as={Link} to={`/accessories`}>
            Phụ kiện
          </Button>
          <Button className="m-2 bg-white text-dark border-0" as={Link} to={`/stores`}>
            Hệ thống cửa hàng
          </Button>
          <Button className="m-2 bg-white text-dark border-0" as={Link} to={`/warnings`}>
            Cảnh báo lừa đảo
          </Button>
          </Col>
          <Col md={2} className="d-flex  ">
            <Button className="bg-white border-0 text-dark" as={Link} to={`/search`} >
              <IoSearchOutline className="fs-3" />
            </Button>
             {profile ? <Button className="bg-white border-0 text-dark" as={Link} to={`/index`} state={profile}>
              <LuUserRound  className="fs-3 " />
            </Button>: <Button className="bg-white border-0 text-dark" onClick={()=>{setShowLogin(true)}} >
              <LuUserRound  className="fs-3 " />
            </Button>}
            <LoginComponent show={showLogin} setShow={setShowLogin}/>
            <Button className="bg-white border-0 text-dark " as={Link} to={`/cart`}>
              <MdOutlineShoppingBag className="fs-3"/>
            </Button>
          </Col>
        </Row>
      </Container>
      <Navbar expand="lg" className="bg-body-tertiary ">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/create">
                Create
              </Nav.Link>
              {profile && (
                <Nav.Link as={Link} to="/index" state={profile}>
                  Profile
                </Nav.Link>
              )}

              {profile && (
                <Nav.Link as={Link} to="/history">
                  Giao dịch
                </Nav.Link>
              )}
            </Nav>
            <Form
              className="d-flex justify-content-end "
              style={{ marginRight: "10px" }}
            >
              <Button variant="outline-success" as={Link} to={`/cart`}>
                {" "}
                <FaShoppingCart />{" "}
              </Button>
            </Form>

            {userId && (
              <Form className="d-flex justify-content-end">
                <Button
                  variant="outline-success"
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  {" "}
                  <AiOutlineLogout />{" "}
                </Button>
              </Form>
            ) }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
