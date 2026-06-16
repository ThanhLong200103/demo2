import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../styles/maxWidth.css";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaLink,
  FaPinterest,
} from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import ProductComponent from "../components/ProductComponent";
import { useEffect, useState } from "react";
import { RepositoryFactory } from "../services/FactoryService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../api/axios";
import CartService from "../services/cart";
import { useDispatch, useSelector } from "react-redux";
import { indexCountItem, setCartItem, setCartLocal } from "../redux/features/cart";
import { useTranslation } from "react-i18next";
export default function DetailProductPage() {
  // const [products, setProducts] = useState([]); // removed: related products section is commented out
  const [productItem, setProductItem] = useState({});
  const [productAttributes, setProductAttributes] = useState([]);
  const [quantityHandle, setQuantityHanlde] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sizes, setSize] = useState([]);
  const [colors, setColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [attributesOne, setAttributesId] = useState(null);
  const { id } = useParams();
  const productId = id;
 const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartLocal } = useSelector((state) => state.cart);
  const d = useDispatch()
  const navigation = useNavigate();
  // console.log(id)
const [mainImg, setMainImg] = useState(null);
const{ t } = useTranslation("detail");
  const i18nextlng = localStorage.getItem("i18nextLng")

  const thumbnails = [
    productItem.img,
    "//product.hstatic.net/200000690725/product/tp038---bt019-den_3__aad19632f25a4e49913e1d80e2a5919c_compact.jpg",
    "//product.hstatic.net/200000690725/product/tp038---bt019-den_12__096f638857f6470d82c09e80ec8e6971_compact.jpg",
    "//product.hstatic.net/200000690725/product/tp038-42_52761813873_o_20dead3d93b34d1188bea7b4ce83cd3d_compact.jpg",
    "//product.hstatic.net/200000690725/product/tp038-43_52761730015_o_888bb61714e74a46b53ce1448cd8d7a9_compact.jpg",
    "//product.hstatic.net/200000690725/product/tp038-44_52761813818_o_3c7be9734f504ab2a937d3a5f62f80d2_compact.jpg",
  ];
  useEffect(() => {
    const getProduct = async () => {
      try {
        // const res = await RepositoryFactory.get("product").getAll();
        const product = await RepositoryFactory.get("product").getById(id);
        const attributes = await RepositoryFactory.get("product").getAttributes(
          {
            productId: id,
          },
        );
        // setProducts(res);
        setProductItem(product[0]);
        setProductAttributes(attributes);
        setMainImg(product[0].img);
        setTotalPrice(product[0]?.price);
         console.log(product)
        console.log("Attributes :", attributes);
        const allSizes = attributes.map((element) => element.size);
        const allColor = attributes.map((element) => element.color);
        const uniqueSizes = [...new Set(allSizes)];
        const uniqueColors = [...new Set(allColor)];
        setSize(uniqueSizes);
        setColor(uniqueColors);
        console.log("Danh sách size duy nhất: ", uniqueSizes);
        console.log("Danh sách color duy nhất: ", uniqueColors);

        setSelectedColor(uniqueColors[0]);
        setSelectedSize(uniqueSizes[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [productId , i18nextlng]);

  useEffect(() => {
    // console.log("tt",selectedSize,selectedColor)

    const getOneAtribute = async () => {
      const data = await RepositoryFactory.get("product").getOneAttributes({
        productId: id,
        sizeAttribute: selectedSize,
        colorAttribute: selectedColor,
      });
      setAttributesId(data);
      console.log("data Attribute One :", data);
    };
    getOneAtribute();
    setTotalPrice((e) => productItem?.price * quantityHandle);
  }, [selectedSize, selectedColor, quantityHandle, productItem]);

  const handleReduce = () => {
    if (quantityHandle <= 1) {
      toast.warning("Không thể thực hiện");
    } else {
      setQuantityHanlde((item) => item - 1);
    }
  };
  const hanldeIncrease = () => {
    if (quantityHandle >= productItem.quantity) {
      toast.warning("Số lượng còn lại không đủ");
    } else {
      setQuantityHanlde((item) => item + 1);
    }
  };

  const handleCreateCart = async () => {
    try {
      if (isAuthenticated) {
      const response = await axiosClient.get("/cart");

      const cartId = response.id;
      console.log(cartId, productItem, quantityHandle);
      await axiosClient.post("/cartitem/create", {
        productId: productItem.id,
        quantity: quantityHandle,
        attributesId: attributesOne.id,
        cartId,
      });
      const cart = await RepositoryFactory.get("cart").getCartItem(cartId)
      d(setCartItem(cart))
      toast.success("Thêm sản phẩm thành công");
  } else {
    if (attributesOne.quantity > 0) {
        const rawData = localStorage.getItem("pendingCart");
        let cart = [];
        
      
        try {
          const parsed = JSON.parse(rawData);
          cart = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          cart = [];
        }
    
        const newItem = {
          productId: productItem.id,
          quantity: quantityHandle,
          attributesId: attributesOne.id,
         img: productItem.img,
          name: productItem.name,
          price: productItem.price ,
          size: selectedSize,
          color: selectedColor
        };
    
        const existingItemIndex = cart.findIndex(
          (item) => item.productId === newItem.productId && item.attributesId === newItem.attributesId
        );
    
        if (existingItemIndex > -1) {
          const totalNewQuantity = cart[existingItemIndex].quantity + newItem.quantity;
          
          
          if (totalNewQuantity > attributesOne.quantity) {
            toast.warning(`Bạn đã có ${cart[existingItemIndex].quantity} sản phẩm trong giỏ. Kho chỉ còn ${attributesOne.quantity}`);
            return; 
          }
          
          cart[existingItemIndex].quantity = totalNewQuantity;
        } else {
          cart.push(newItem);
        }
    
        localStorage.setItem("pendingCart", JSON.stringify(cart));
        const updatedCart = JSON.parse(localStorage.getItem("pendingCart")) || [];
        d(setCartLocal({ cartLocal: updatedCart }));
        d(setCartItem(updatedCart));
        d(indexCountItem(updatedCart.length));
    console.log("Cart data from localStorage 111:", JSON.parse(localStorage.getItem("pendingCart")));

        toast.success("Đã thêm vào giỏ hàng tạm");
        
        
      } else {
        toast.warning("Sản phẩm hiện tại đã hết hàng");
      }
  }
      // d(indexCountItem(countItem+1))
    } catch (err) {
      toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng");
      console.log(err);
    }
  };
  const handleOder = () => {
    if(isAuthenticated){
    navigation("/order", { state: { totalPrice, productId, quantityHandle, priceProduct: productItem?.price, attributeId: attributesOne?.id, nameProduct: productItem?.name, imgProduct: productItem?.img, selectedColor, selectedSize } });

    }
    else{
        navigation("/account");
      toast.warning("Vui lòng đăng nhập để mua hàng");
    }
  };
  return (
    <>
      <Container fluid className="">
        <div className="maxWidth">
          <Row className="d-flex">
            <Col md={12} lg={4}>
              <div className="w-100 mb-3 mt-5" style={{ overflow: "hidden" }}>
                <img
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  src={mainImg}
                  alt="product"
                />
              </div>

              {/* Thumbnail */}
              <ul className="list-unstyled row row-cols-6 g-1">
                {thumbnails.map((img, index) => (
                  <li className="col" key={index}>
                    <img
                      className="img-fluid border"
                      src={img}
                      alt=""
                      onClick={() => setMainImg(img)}
                      style={{ cursor: "pointer" }}
                    />
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={12} lg={6} className="border-start">
              <div className="mt-2 ">
                <div>
                  <h1>{productItem.name}</h1>
                </div>
                <div>
                  <span className="pe-2 border-end">
                    {" "}
                    {t("detail.productCode")} : <b className="fw-bold">Test</b>{" "}
                  </span>
                  <span className="px-2 border-end">
                    {" "}
                    {t("detail.status")} :
                    <b className="fw-bold">
                      {attributesOne?.quantity > 0 ? t("detail.inStock") : t("detail.outOfStock")}
                    </b>
                  </span>
                  <span className="ps-2">
                    {t("detail.brand")} : <b className="fw-bold">TORANO</b>
                  </span>
                </div>
                <div>
                  <div
                    className="d-flex gap-3 py-3 ps-2 mt-3 "
                    style={{ background: "#f5f5f5", borderRadius: "5px" }}
                  >
                    <span className="me-5 fw-bold ">Giá :</span>
                    <span className="text-danger fw-bold">
                      {totalPrice.toLocaleString()}
                    </span>
                    <b>100,000,000đ</b>
                    <span
                      className="bg-danger px-2 border-0 text-white"
                      style={{ borderRadius: "10px" }}
                    >
                      -33%
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <Form>
                    <Row className="align-items-center mb-4">
                      <Col xs={4} md={3} lg={2}>
                        <span className="fw-bold">{t("detail.color")}:</span>
                      </Col>
                      <Col
                        xs={8}
                        md={9}
                        lg={10}
                        className="d-flex flex-wrap gap-2"
                      >
                        <div className="d-flex flex-wrap gap-2">
                          {colors.map((color) => (
                            <div key={color} className="relative">
                              <input
                                type="radio"
                                id={`color-${color}`}
                                name="color"
                                value={color}
                                checked={selectedColor === color}
                                onChange={() => setSelectedColor(color)}
                                className="d-none"
                              />
                              <label
                                htmlFor={`color-${color}`}
                                className={`inline-block px-4 py-2  border border-gray-300 rounded-md cursor-pointer transition-all peer-checked:border-2 peer-checked:border-gray-900 peer-checked:font-bold ${selectedColor === color ? "bg-danger text-white" : "bg-white"}`}
                                style={{ borderRadius: "10px" }}
                              >
                                {color}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col xs={4} md={3} lg={2} className="pt-2">
                        <span className="fw-bold">{t("detail.size")}:</span>
                      </Col>
                      <Col xs={8} md={9} lg={10}>
                        <div className="d-flex flex-wrap gap-2 mb-2">
                          {sizes.map((size) => (
                            <div key={size} className="relative">
                              <input
                                type="radio"
                                id={`size-${size}`}
                                name="size"
                                value={size}
                                checked={selectedSize === size}
                                onChange={() => setSelectedSize(size)}
                                className="d-none"
                              />
                              <label
                                htmlFor={`size-${size}`}
                                className={`inline-block px-4 py-2  border border-gray-300 rounded-md cursor-pointer transition-all peer-checked:border-2 peer-checked:border-gray-900 peer-checked:font-bold ${selectedSize === size ? "bg-danger text-white" : "bg-white"}`}
                                style={{ borderRadius: "10px" }}
                              >
                                {size}
                              </label>
                            </div>
                          ))}
                        </div>

                        <div className="d-flex justify-content-between align-items-end">
                          <div className="d-flex flex-wrap gap-2"></div>
                          <a
                            href="#"
                            className="text-dark"
                            style={{
                              textDecoration: "underline",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            {t("detail.sizeGuide")}
                          </a>
                        </div>
                      </Col>
                    </Row>
                  </Form>

                  <Row className="align-items-center mt-4">
                    <Col xs={4} md={3} lg={2}>
                      <span className="fw-bold">{t("detail.quantity")}:</span>
                    </Col>
                    <Col xs={8} md={9} lg={10}>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-secondary"
                          className="d-flex justify-content-center align-items-center text-dark bg-white border"
                          style={{
                            width: "45px",
                            height: "45px",
                            fontSize: "1.2rem",
                          }}
                          onClick={() => {
                            handleReduce();
                          }}
                        >
                          -
                        </Button>
                        <span
                          className="d-flex justify-content-center align-items-center fs-6 "
                          style={{ width: "50px", height: "45px" }}
                        >
                          {quantityHandle}
                        </span>
                        <Button
                          variant="outline-secondary"
                          className="d-flex justify-content-center align-items-center text-dark bg-white border"
                          style={{
                            width: "45px",
                            height: "45px",
                            fontSize: "1.2rem",
                          }}
                          onClick={() => {
                            hanldeIncrease();
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="d-flex  justify-content-between mt-4">
                  <Button
                    className=" py-2 bg-white text-danger border-danger"
                    style={{ width: "45%" }}
                    onClick={() => {
                      handleCreateCart();
                    }}
                  >
                    {t("detail.addToCart")}
                  </Button>
                  <Button
                    className=" py-2 bg-danger border-danger"
                    style={{ width: "45%" }}
                    onClick={() => {
                      handleOder();
                    }}
                  //   as={Link}
                  //   to={"/order"}
                  //   state={{totalPrice ,productId ,quantityHandle ,  priceProduct : productItem?.price ,attributeId :attributesOne?.id , nameProduct :productItem?.name, imgProduct:productItem?.img ,selectedColor ,selectedSize}}
                  >
                    {t("detail.buyNow")}
                  </Button>
                </div>
                <button
                  className="w-100 border-0  bg-black text-white py-3 mt-4"
                  style={{ borderRadius: "5px" }}
                >
                  {t("detail.offer")}
                </button>
              </div>
              <div className=" mt-3">
                <ul className="list-unstyled d-flex justify-content-start gap-2  ">
                  <li className="me-5 mt-3 fw-bold">{t("detail.share")}:</li>
                  <li className="fs-4 ">
                    <a href="">
                      <FaFacebook />
                    </a>
                  </li>
                  <li className="fs-4">
                    <a href="">
                      <FaFacebookMessenger />
                    </a>
                  </li>
                  <li className="fs-4">
                    <a href="">
                      <AiFillTwitterCircle />
                    </a>
                  </li>
                  <li className="fs-4 ">
                    <a href="">
                      <FaPinterest className="text-danger" />
                    </a>
                  </li>
                  <li className="fs-4">
                    <a href="">
                      <FaLink />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <ul className="list-unstyled d-flex flex-wrap text-start">
                  <li className="col-lg-4 col-md-12 p-2">
                    {t("detail.text1")}
                  </li>
                  <li className="col-lg-4 col-md-12 p-2">
                    {t("detail.text2")}
                  </li>
                  <li className="col-lg-4 col-md-12 p-2">
                    {t("detail.text3")}{" "}
                  </li>
                  <li className="col-lg-4 col-md-12 p-2">
                    {t("detail.text4")}
                  </li>
                  <li className="col-lg-4 col-md-12 p-2">
                    {t("detail.text5")}
                  </li>
                  <li className="col-lg-4 col-md-12 p-2">
                    {t("detail.text6")}
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 text-center my-4">
              <h2>{t("detail.product")}</h2>
            </Col>
            {/* <ProductComponent products={products}></ProductComponent> */}
          </Row>
        </div>
      </Container>
    </>
  );
}
