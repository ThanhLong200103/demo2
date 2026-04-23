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
import "../styles/notification.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineShoppingBag } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import LoginComponent from "./LoginComponent";
import CustomCartItem from "../pages/CartPage";
import "../styles/maxWidth.css";
import "../styles/navHover.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import NotificationComponent from "./notificationComponent";
import { TfiAlignJustify } from "react-icons/tfi";
import { openSideBar } from "../redux/features/sideBar";
import { SlMenu } from "react-icons/sl";
import { openCart } from "../redux/features/cart";
import { openSearch } from "../redux/features/search";
export default function HeaderComponent(params) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { countItem } = useSelector((state) => state.cart);
  const [userId, setId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [categorys, setCategorys] = useState([]);

  // const [showCart , setShowCart] = useState(false);

  useEffect(() => {
    if (token) {
      const checkMe = async () => {
        try {
          const user = await RepositoryFactory.get("user").profile();
          console.log(user.id);
          setId(user.id);
          setProfile(user);
          const category =
            await RepositoryFactory.get("category").getCategory();
           console.log(category);
        // if (!category) return [];
          const buildTree = (data) => {
            const map = {};
            const tree = [];

            // B1: tạo map id → object
            data.forEach((item) => {
              map[item.id] = { ...item, children: [] };
            });

            // B2: build cây
            data.forEach((item) => {
              if (item.parent_id === null) {
                tree.push(map[item.id]); // node cha
              } else {
                map[item.parent_id]?.children.push(map[item.id]);
              }
            });

            setCategorys(tree);
            console.log(tree)
          };
          buildTree(category);
       
        } catch (error) {
          console.log("Token expired, attempting refresh..." ,error);
          
        }
      };
      checkMe();
    }
    // console.log(showSideBar)
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
  const handleSideBar = () => {
    dispatch(openSideBar(true));
  };
  return (
    <>
      <Container
        fluid
        className=" top-0 border-bottom "
        style={{ minHeight: "80px" }}
      >
        <Row className="align-items-center d-flex justify-content-between bg-dark text-white px-2 pt-2  d-none d-lg-block">
          <div className="bg-dark text-white">
            <div className="maxWidth d-flex justify-content-between align-items-center px-2">
              <div>
                Hotline mua hàng:
                <a
                  href="tel:0964942121"
                  className="text-white ms-1 text-decoration-none "
                >
                  0964942121
                </a>
                <span className="pe-2">
                  {" "}
                  (8:30-21:30, Tất cả các ngày trong tuần){" "}
                </span>
                |
                <span>
                  <a
                    href="/pages/contact"
                    className="text-decoration-none ps-2 text-white"
                  >
                    {" "}
                    Liên hệ{" "}
                  </a>
                </span>
              </div>
              <div className="d-flex gap-1 position-relative">
                <div className="position-relative">
                  <IoMdNotificationsOutline className="fs-5  " />
                  <span className=" Notification ">0</span>
                </div>
                Thông báo của tôi
                {/* <NotificationComponent ></NotificationComponent> */}
              </div>
            </div>
          </div>
        </Row>

        <div className="maxWidth container-fluid bg-white mb-md-2 mb-xs-2 d-xs-block">
          <Row
            className="align-items-center d-flex justify-content-between pt-1 px-2"
            style={{}}
          >
            <Col className=" d-lg-none " xs={2}>
              <Button
                className="bg-white border-0 text-black"
                onClick={() => {
                  handleSideBar();
                }}
              >
                <SlMenu />
              </Button>
            </Col>
            <Col xs={4} md={2} className="d-flex justify-content-center ">
              <Button className="bg-white border-0 w-100 " as={Link} to={`/`}>
                <img
                  src="//theme.hstatic.net/200000690725/1001078549/14/logo.png?v=1069"
                  alt="Torano"
                  className="img-fluid "
                  style={{ maxHeight: "70px" }}
                />
              </Button>
            </Col>
            <Col
              md={6}
              lg={8}
              xs={4}
              className="d-flex justify-content-center flex-wrap text-center  d-none d-lg-block "
            >
              <Button
                className="mt-1 bg-white text-dark border-0"
                as={Link}
                to={`/`}
              >
                Sản phẩm mới
              </Button>
              <Button
                className="mt-1 bg-white text-dark border-0"
                as={Link}
                to={`/sale`}
              >
                Danh mục sale
              </Button>
             
                {categorys.map((c) => (
  <div key={c.id} className="d-inline-block position-relative parentShowShirt">
    <Button
      className="mt-1 bg-white text-dark border-0"
      as={Link}
      to={`/${c.name}`}
    >
      {c.name} <RiArrowDropDownLine className="fs-4" />
    </Button>
    {c.children && c.children.length > 0 && (
      <ul
        className="list-unstyled position-absolute z-1 text-start bg-white showShirt"
        style={{ minWidth: "200px" }}
      >
        {c.children.map((child) => (
          <li key={child.id} className="m-3">
            <Link
              to={`/category/${child.id}`}
              className="text-black text-decoration-none"
            >
              {child.name}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
))}
              
              <Button
                className="mt-1 bg-white text-dark border-0"
                as={Link}
                to={`/stores`}
              >
                Hệ thống cửa hàng
              </Button>
              <Button
                className="mt-1 bg-white text-dark border-0"
                as={Link}
                to={`/warnings`}
              >
                Cảnh báo lừa đảo
              </Button>
            </Col>
            <Col md={2} xs={4} lg={1} className="d-flex justify-content-end  ">
              <Button
                className="bg-white border-0 text-dark"
                onClick={() => {
                  dispatch(openSearch(true));
                }}
              >
                <IoSearchOutline className="fs-4" />
              </Button>
              {profile ? (
                <Button
                  className="bg-white border-0 text-dark"
                  as={Link}
                  to={`/index`}
                  state={profile}
                >
                  <LuUserRound className="fs-4 " />
                </Button>
              ) : (
                <Button
                  className="bg-white border-0 text-dark position-relative"
                  onClick={() => {
                    setShowLogin((item) => !item);
                  }}
                >
                  <LuUserRound className="fs-4 " />
                  {showLogin && <LoginComponent setShowLogin={setShowLogin} />}
                </Button>
              )}

              <Button
                className="bg-white border-0 text-dark position-relative "
                onClick={() => {
                  dispatch(openCart(true));
                }}
              >
                <MdOutlineShoppingBag className="fs-3 " />
                <span className="CartCation">{countItem}</span>
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
