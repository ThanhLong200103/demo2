// import { Button, Col, Container, Row } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import "../styles/cart.css";
import { useDispatch, useSelector } from "react-redux";
import { closeCart, indexCountItem, setCartItem } from "../redux/features/cart";
import { useTranslation } from 'react-i18next';

// import { Link } from "react-router-dom";
import React, { useEffect, useState, useMemo, use } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
} from "react-bootstrap";
import {
  FaUser,
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaCreditCard,
} from "react-icons/fa";
import axiosClient from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
// import OrderPage from "./orderPage";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../services/FactoryService";

export default function CartComponent({ open }) {
  const d = useDispatch();
  const [cart, setCart] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const{cartLocal} = useSelector((state) => state.cart);
  const navigation = useNavigate();
const localCartItem = JSON.parse(localStorage.getItem("pendingCart")) || [];
  const { t } = useTranslation("cart");


  // console.log(isAuthenticated)
  const CartService = RepositoryFactory.get("cart");
  const totalPrice = useMemo(() => {
    return cart
      .filter((item) => selectedIds.includes(item.id))
      .reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
  }, [cart, selectedIds]);

  const handelIncrease = async (id, currentQty) => {
    const newQty = currentQty + 1;

    try {
      await CartService.updateCartItem(id, {
        quantity: newQty,
        quantityProduct: -1,
      });
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item,
        ),
      );
    } catch (error) {
      console.log(error);
      if (error.response?.status === 422) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Lỗi khi tăng số lượng");
      }
    }
  };
  // console.log(totalPrice)
  // console.log(selectedIds)
  const handleReduce = async (id, currentQty) => {
    if (currentQty <= 1) {
      toast.error("Số lượng không thể giảm thêm");
      return;
    }
    const newQty = currentQty - 1;

    try {
      await CartService.updateCartItem(id, {
        quantity: newQty,
        quantityProduct: 1,
      });
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item,
        ),
      );
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi giảm số lượng");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const cartRun = async () => {
        try {
          const response = await CartService.getCart();
          // console.log("Cart data:", response);
          const cartItemData = await CartService.getCartItem(response.id);
          // console.log("1111",cartItemData);

          d(setCartItem(cartItemData));
          d(indexCountItem(cartItems.length));
          setCart(cartItems);
        } catch (error) {
          console.error("Lỗi API Cart:", error);
          toast.error("Lỗi khi tải giỏ hàng");
        }
      };
      cartRun();
    } else {
      
      setCart(cartLocal);
    }
  }, [isAuthenticated, cartItems.length , cartLocal]);
  // thêm cart thì thêm vào đc luôn nhưng gửi request liên tục

  //  useEffect(
  //   ()=>{

  //       const setCarts = async ()=>{
  //      const response = await CartService.getCart();
  //         const cartItemData =  await CartService.getCartItem(response.id);
  //         d(setCartItem(cartItemData))
  //       setCart(cartItems)
  //      d(indexCountItem(cartItems.length))
  //      console.log(cartItems.length)
  //     }

  //     setCarts()

  //   },[cartItems.length]
  //  )
  async function handleDeleteCart(id) {
    try {
      if (isAuthenticated) {
        await CartService.deleteCartItem(id);
      setCart((s) => s.filter((item) => item.id !== id));
      setSelectedIds((s) => s.filter((itemId) => itemId !== id));
      d(setCartItem(cartItems.filter((item) => item.id !== id)));
      }else{

      }
    } catch (err) {
      console.log(err);
      toast.error("Lỗi khi xóa sản phẩm khỏi giỏ");
    }
  }
  const handelOrder = () => {
   if(isAuthenticated){
      navigation("/order", {  state: { totalPrice, selectedIds } });
     d(closeCart(false));
    setSelectedIds([]);
   }else{
        navigation("/account");
     d(closeCart(false));
      toast.warning("Vui lòng đăng nhập để mua hàng");
   }
  };
  const handleCheck = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  return (
    <>
      <div
        className={`cart-overlay ${open ? "active" : ""} `}
        onClick={() => {
          d(closeCart(false));
        }}
      ></div>
      <Container className={` cart ${open ? "active" : ""}  `}>
        <Row style={{ position: "relative" }}>
          <div className="d-flex justify-content-between  py-1 border-bottom fs-3 px-4 fw-bold ">
            <Col className="mt-2">{t("cart.cartItem")}</Col>
            <Col className="text-end ">
              <Button
                className="bg-white border-0 text-black fs-2"
                onClick={() => {
                  d(closeCart(false));
                }}
              >
                <IoCloseOutline />
              </Button>
            </Col>
          </div>
        </Row>
        {cart.length > 0 ? (
          <div
            style={{
              backgroundColor: "#f8f9fa",
              minHeight: "80vh",
              pb: "100px",
            }}
            className="cart-items"
          >
            <Container className="py-5" style={{ overflowY: "auto" }}>
              <h3 className="mb-4 fw-bold">
                <FaShoppingCart className="me-2" /> {t("cart.my cart")}
              </h3>
              <Row className="justify-content-center">
                <Col lg={9}>
                  {cart.map((c) => (
                    <Card
                      key={c.id}
                      className="mb-3 border-0 shadow-sm overflow-hidden position-relative "
                      style={{ borderRadius: "15px", maxHeight: "150px" }}
                    >
                      <Card.Body className="p-0 ">
                        <Row className="align-items-center g-0">
                          <Col
                            xs={1}
                            className="d-flex justify-content-center border-end"
                          >
                            <Form.Check
                              type="checkbox"
                              checked={selectedIds.includes(c.id)}
                              onChange={() => handleCheck(c.id)}
                              style={{ transform: "scale(1.3)" }}
                            />
                          </Col>

                          <Col xs={3} md={2} className="">
                            <img
                              src={c.img}
                              alt={c.name}
                              className="img-fluid rounded"
                              style={{
                                objectFit: "cover",
                                height: "80px",
                                width: "100%",
                              }}
                            />
                          </Col>

                          <Col xs={8} md={8} className="">
                            <h6 className="fw-bold mb-1 ">{c.name}</h6>
                            <div className="text-danger fw-bold d-flex">
                              {(c.price * c.quantity)?.toLocaleString()}{" "}
                              <small>đ</small>
                            </div>
                          </Col>

                          <Row
                            xs={2}
                            md={3}
                            className="d-flex justify-content-center "
                          >
                            <div
                              className="d-flex align-items-center border rounded-pill  bg-light"
                              style={{ maxWidth: "100px" }}
                            >
                              <Button
                                variant="link"
                                className="text-dark p-0"
                                onClick={() => handleReduce(c.id, c.quantity)}
                              >
                                <FaMinus size={12} />
                              </Button>
                              <Form.Control
                                type="text"
                                value={c.quantity}
                                readOnly
                                className="text-center bg-transparent border-0 fw-bold mx-1"
                                style={{ width: "40px", paddingLeft: "10px" }}
                              />
                              <Button
                                variant="link"
                                className="text-dark p-0"
                                onClick={() => handelIncrease(c.id, c.quantity)}
                              >
                                <FaPlus size={12} />
                              </Button>
                            </div>
                            <div className="d-flex w-75 gap-4">
                              <p> Size: {c.size}</p>
                              <p>Màu Sắc: {c.color}</p>
                            </div>
                          </Row>

                          <Col xs={5} md={1} className="text-center p-3">
                            <Button
                              variant="outline-dark"
                              size="sm"
                              className="border-0 position-absolute top-0"
                              onClick={() => handleDeleteCart(c.id)}
                              style={{ right: "0" }}
                            >
                              <IoCloseOutline />
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </Col>
              </Row>
            </Container>

            <div
              className="fixed-bottom bg-white border-top shadow-lg p-3"
              style={{ zIndex: 1030 }}
            >
              <Container>
                <Row className="align-items-center">
                  <Col xs={6} md={8}>
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="checkbox"
                        label={t("cart.all products")}
                        className="me-4 d-none d-md-block"
                        checked={
                          selectedIds.length === cart.length && cart.length > 0
                        }
                        onChange={(e) => {
                          if (e.target.checked)
                            setSelectedIds(cart.map((i) => i.id));
                          else setSelectedIds([]);
                        }}
                      />
                      <div className="ms-md-auto text-end me-4">
                        <span className="text-muted d-block d-md-inline me-md-2">
                          {t("cart.total")} ({selectedIds.length} {t("cart.product")}):
                        </span>
                        <span className="text-danger fs-4 fw-bold">
                          {totalPrice?.toLocaleString()} đ
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} md={4}>
                    <Button
                      variant="danger"
                      size="lg"
                      className="w-100 fw-bold py-2 shadow-sm"
                      disabled={selectedIds.length === 0}
                      style={{ borderRadius: "10px" }}
                      // as={Link}
                      // to={`/order`}
                      // state={{ totalPrice, selectedIds }}
                      onClick={() => {
                        handelOrder();
                      }}
                    >
                      {t("cart.checkout")}
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        ) : (
          <>
            <Row>
              <img
                src="//theme.hstatic.net/200000690725/1001078549/14/cart_banner_image.jpg?v=1069"
                alt=""
              />
            </Row>
            <Row className="text-center">
              <div className=" fs-3">{t("cart.empty cart")}</div>
              <div className="pt-3 d-flex justify-content-evenly">
                <p>
                  <Link to="/products">{t("cart.back to products")}</Link>
                </p>
                <p>
                  <Link to="/promotions">{t("cart.promotion")}</Link>
                </p>
              </div>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
