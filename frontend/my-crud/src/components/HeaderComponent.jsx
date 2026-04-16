import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaChevronDown, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authAccess";
import { RepositoryFactory } from "../services/FactoryService";
import { Col, Row } from "react-bootstrap";
import "../styles/notification.css"
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import LoginComponent from "./LoginComponent";
import CustomCartItem from "../pages/CartPage";
import "../styles/maxWidth.css"
import { RiArrowDropDownLine } from "react-icons/ri";
import NotificationComponent from "./notificationComponent";
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
      <Container fluid className=" top-0 border-bottom " >
        <Row className="align-items-center d-flex justify-content-between bg-dark text-white px-2 pt-2 " >
          <div className="bg-dark text-white">
    <div className="maxWidth d-flex justify-content-between align-items-center px-2">
      <div>
        Hotline mua hàng:
        <a href="tel:0964942121" className="text-white ms-1 text-decoration-none ">
          0964942121 
        </a>
         <span className="pe-2" > (8:30-21:30, Tất cả các ngày trong tuần) </span>
         |
          <span>
          <a href="/pages/contact" className="text-decoration-none ps-2 text-white"> Liên hệ </a>
        </span>
      </div>
      <div className="d-flex gap-1 position-relative">
        <div className="position-relative">
          <IoMdNotificationsOutline  className="fs-5  "/> 
        <span className=" Notification ">0</span>
        </div>
        Thông báo của tôi
        {/* <NotificationComponent ></NotificationComponent> */}
      </div>
      
    </div>
  </div>
        </Row>

       <div className="maxWidth bg-white">
         <Row className="align-items-center d-flex justify-content-between pt-1 px-2 " style={{}}>
          <Col md={2} className="d-flex justify-content-center " >
          <Button className="bg-white border-0" as={Link} to={`/`}>
              <img
              src="//theme.hstatic.net/200000690725/1001078549/14/logo.png?v=1069"
              alt="Torano"
              className="img-fluid "
            />
          </Button>
          </Col >
          <Col md={8} className="d-flex justify-content-center flex-wrap  ">
          <Button className="mt-1 bg-white text-dark border-0" as={Link} to={`/`}>
            Sản phẩm mới
          </Button>
          <Button className="mt-1 bg-white text-dark border-0" as={Link} to={`/sale`}>
            Danh mục sale
          </Button>
          <Button className="mt-1 bg-white text-dark border-0" as={Link} to={`/shirts`}>
            Áo Nam <RiArrowDropDownLine className="fs-4" />
          </Button>
          <Button className="m-1 bg-white text-dark border-0" as={Link} to={`/pants`}>
             Quần nam <RiArrowDropDownLine className="fs-4"/>
          </Button>
          <Button className="mt-1 bg-white text-dark border-0" as={Link} to={`/accessories`}>
            Phụ kiện <RiArrowDropDownLine className="fs-4"/>
          </Button>
          <Button className="mt-1 bg-white text-dark border-0" as={Link} to={`/stores`}>
            Hệ thống cửa hàng
          </Button>
          <Button className="mt-1 bg-white text-dark border-0" as={Link} to={`/warnings`}>
            Cảnh báo lừa đảo
          </Button>
          </Col>
          <Col md={2} className="d-flex justify-content-end  ">
            <Button className="bg-white border-0 text-dark" as={Link} to={`/search`} >
              <IoSearchOutline className="fs-4" />
            </Button>
             {profile ? <Button className="bg-white border-0 text-dark" as={Link} to={`/index`} state={profile}>
              <LuUserRound  className="fs-4 " />
            </Button>: <Button className="bg-white border-0 text-dark position-relative" onClick={()=>{setShowLogin((item)=>!item)}} >
              <LuUserRound  className="fs-4 " />
              {showLogin && <LoginComponent setShowLogin={setShowLogin}/>}
            </Button>}
            
            <Button className="bg-white border-0 text-dark position-relative " as={Link} to={`/cart`} >
              <MdOutlineShoppingBag className="fs-3 "/>
              <span className="CartCation">0</span>
            </Button>
          </Col>
        </Row>
       </div>
      </Container>
      {/* <Navbar expand="lg" className="bg-body-tertiary ">
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
      </Navbar> */}
    </>
  );
}
