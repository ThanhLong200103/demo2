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
import { GrLanguage } from "react-icons/gr";
import { SlMenu } from "react-icons/sl";
import { indexCountItem, openCart } from "../redux/features/cart";
import { openSearch } from "../redux/features/search";
import { useTranslation } from "react-i18next";
export default function HeaderComponent(params) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { countItem } = useSelector((state) => state.cart);
 
  const [userId, setId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const localCartItem = JSON.parse(localStorage.getItem("pendingCart")) || [];
  const { t, i18n } = useTranslation("header");
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    dispatch(changeLanguageLocal(lng));
  };
  const i18nextlng = localStorage.getItem("i18nextLng")
  const [showLanguage , setShowLanguage] = useState(true)
  // const [showCart , setShowCart] = useState(false);
  useEffect(() => {
    // if (!category) return [];
    const buildTree = async () => {
      const map = {};
      const tree = [];
      const category = await RepositoryFactory.get("category").getCategory();
      console.log(category);
      // B1: tạo map id → object
      category.forEach((item) => {
        map[item.id] = { ...item, children: [] };
      });

      // B2: build cây
      category.forEach((item) => {
        if (item.parent_id === null) {
          tree.push(map[item.id]); // node cha
        } else {
          map[item.parent_id]?.children.push(map[item.id]);
        }
      });

      setCategorys(tree);
      console.log(tree);
    };
    buildTree();
  }, [i18nextlng]);
  useEffect(() => {
    if (token) {
      const checkMe = async () => {
        try {
          const user = await RepositoryFactory.get("user").profile();
          console.log(user.id);
          setId(user.id);
          setProfile(user);
        } catch (error) {
          console.log("Token expired, attempting refresh...", error);
        }
      };
      checkMe();
    } else {
      dispatch(indexCountItem(localCartItem.length));
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
                {t("header.customer")}
                <a
                  href="tel:0964942121"
                  className="text-white ms-1 text-decoration-none "
                >
                  {t("header.hotline")}
                </a>
                <span className="pe-2"> {t("header.hotlineDescription")} </span>
                |
                <span>
                  <a
                    href="/pages/contact"
                    className="text-decoration-none ps-2 text-white"
                  >
                    {" "}
                    {t("header.contact")}{" "}
                  </a>
                </span>
              </div>
              <div className="d-flex gap-1 position-relative">
                <div className="position-relative">
                  <IoMdNotificationsOutline className="fs-5  " />
                  <span className=" Notification ">0</span>
                </div>
                {t("header.notification")}
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
                {t("header.productNew")}
              </Button>
              <Button
                className="mt-1 bg-white text-dark border-0"
                as={Link}
                to={`/sale`}
              >
                {t("header.categories Sale")}
              </Button>

              {categorys.map((c) => (
                <div
                  key={c.id}
                  className="d-inline-block position-relative parentShowShirt"
                >
                  <Button
                    className="mt-1 bg-white text-dark border-0"
                    as={Link}
                    to={`/collections/${c.name}`}
                    state={{ idCategory: c.id }}
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
                            to={`/collections/${child.name}`}
                            state={{ idCategory: child.id }}
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
                {t("header.Store system")}
              </Button>
              <Button
                className="mt-1 bg-white text-dark border-0"
                as={Link}
                to={`/warnings`}
              >
                {t("header.scam warning")}
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

              <Button
                className="bg-white border-0 text-dark position-relative"
                onClick={() => {
                  setShowLogin((item) => !item);
                }}
              >
                <LuUserRound className="fs-4 " />
                {showLogin && <LoginComponent setShowLogin={setShowLogin} />}
              </Button>

              <Button
                className="bg-white border-0 text-dark position-relative "
                onClick={() => {
                  dispatch(openCart(true));
                }}
              >
                <MdOutlineShoppingBag className="fs-3 " />
                <span className="CartCation">{countItem}</span>
              </Button>
              <div className="position-relative ">
                <Button className="bg-white text-dark border-0 fs-5" onClick={()=>{setShowLanguage(item=>!item)}}>
                  <GrLanguage />
                </Button>
                <div className={`position-absolute  d-flex flex-column ${showLanguage && "d-none"}`} style={{minWidth:"100px" ,left:"-36px" ,right:"" ,zIndex:"1000"}}>
                  <button className="text-black"  style={{background :"#f5f5f5"}} onClick={() => {changeLanguage("vi") ,setShowLanguage(true)}}>
                    Tiếng Việt
                  </button>
                  <button className="text-black" style={{background :"#f5f5f5"}} onClick={() => {changeLanguage("en") ,setShowLanguage(true)}}>
                    English
                  </button>
                </div>
              </div>
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
