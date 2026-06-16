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
import "../styles/detailProduct.css";
import { toast } from "react-toastify";
import axiosClient from "../api/axios";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeDetail } from "../redux/features/detail";
import CartService from "../services/cart";
import { indexCountItem, setCartItem, setCartLocal } from "../redux/features/cart";
import { json, useNavigate } from "react-router-dom";

export default function DetailComponent({ showDetail, productId }) {
  // const [products, setProducts] = useState([]);
  const [productItem, setProductItem] = useState({});
  const [productAttributes, setProductAttributes] = useState([]);
  const [quantityHandle, setQuantityHanlde] = useState(1);
  const [sizes, setSize] = useState([]);
  const [colors, setColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [attributesOne, setAttributesId] = useState(null);
  const [mainImg, setMainImg] = useState(null);
  const d = useDispatch();
  const i18nextlng = localStorage.getItem("i18nextLng")

const localCartItem = JSON.parse(localStorage.getItem("pendingCart")) || [];

  const { isAuthenticated } = useSelector((state) => state.auth);
//  console.log("authenticated:", isAuthenticated);
  const n = useNavigate();
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
      if (!productId) return;
      try {
        // const res = await RepositoryFactory.get("product").getAll();
        const id = productId;
        const product = await RepositoryFactory.get("product").getById(id);
        // console.log("Product :", product);
        const attributes = await RepositoryFactory.get("product").getAttributes(
          {
            productId: id,
          },
        );
        // console.log(attributes);
        // setProducts(res);
        setProductItem(product[0]);
        setProductAttributes(attributes);
        setMainImg(product[0].img);
        //  console.log(res)
        //  console.log(product)
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
  }, [productId ]);

  useEffect(() => {
    // console.log("tt",selectedSize,selectedColor)

    const getOneAtribute = async () => {
      if (!productId || !selectedSize || !selectedColor) return;
      const data = await RepositoryFactory.get("product").getOneAttributes({
        productId: productId,
        sizeAttribute: selectedSize,
        colorAttribute: selectedColor,
      });
      setAttributesId(data);
      console.log("data Attribute One :", data);
    };
    getOneAtribute();
    setQuantityHanlde(1);
  }, [selectedSize, selectedColor, productId]);

  const handleReduce = () => {
    if (quantityHandle <= 1) {
      toast.warning("Không thể thực hiện");
    } else {
      setQuantityHanlde((item) => item - 1);
    }
  };
  const hanldeIncrease = () => {
    if (quantityHandle >= attributesOne.quantity) {
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
        const cart = await RepositoryFactory.get("cart").getCartItem(cartId);
        d(setCartItem(cart));
        toast.success("Thêm sản phẩm thành công");
        // d(indexCountItem(countItem+1))
        d(closeDetail({ showDetail: false, productId: null }));
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
    console.log("Cart data from localStorage:", JSON.parse(localStorage.getItem("pendingCart")));
    toast.success("Đã thêm vào giỏ hàng tạm");
    
    
    d(closeDetail({ showDetail: false, productId: null }));
    
  } else {
    toast.warning("Sản phẩm hiện tại đã hết hàng");
  }
}
    } catch (err) {
      toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng");
      console.log(err);
    }
  };
  const handleOder = () => {};
  return (
    <>
      <div
        className={`detail-overlay ${showDetail && "active"} `}
        onClick={() => {
          d(closeDetail({ showDetail: false, productId: null }));
        }}
      ></div>
     <Container className={`detail ${showDetail ? "active" : ""}`}>
  <Row className="g-4 pt-4 pb-4">

    {/* LEFT - IMAGE */}
    <Col xs={12} lg={4}>
      <div className="mt-3">
        <img
          src={mainImg}
          className="w-100 rounded"
          style={{ objectFit: "cover", maxHeight: "420px" }}
        />
      </div>

      <div className="mt-2 d-flex flex-wrap gap-2">
        {thumbnails.map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => setMainImg(img)}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              cursor: "pointer",
              borderRadius: "6px"
            }}
          />
        ))}
      </div>
    </Col>

    {/* RIGHT - INFO */}
    <Col xs={12} lg={8} className="border-start-lg ps-lg-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-start">
        <h4 className="fw-bold">{productItem.name}</h4>

        <IoCloseOutline
          size={26}
          className="cursor-pointer"
          onClick={() =>
            d(closeDetail({ showDetail: false, productId: null }))
          }
        />
      </div>

      {/* INFO */}
      <div className="text-muted small mt-2">
        <div>Mã: <b>TEST</b></div>
        <div>
          Tình trạng:{" "}
          <b>{attributesOne?.quantity > 0 ? "Còn hàng" : "Hết hàng"}</b>
        </div>
      </div>

      {/* PRICE */}
      <div className="mt-3 p-3 bg-light rounded d-flex gap-3 align-items-center">
        <span className="fw-bold">Giá:</span>
        <span className="text-danger fw-bold fs-5">
          {productItem.price?.toLocaleString()}đ
        </span>
      </div>

      {/* COLOR */}
      <div className="mt-4">
        <div className="fw-bold mb-2">Màu sắc</div>
        <div className="d-flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`btn btn-sm ${
                selectedColor === color
                  ? "btn-danger"
                  : "btn-outline-secondary"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* SIZE */}
      <div className="mt-3">
        <div className="fw-bold mb-2">Kích thước</div>
        <div className="d-flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`btn btn-sm ${
                selectedSize === size
                  ? "btn-danger"
                  : "btn-outline-secondary"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* QUANTITY */}
      <div className="mt-4 d-flex align-items-center gap-3">
        <span className="fw-bold">Số lượng</span>

        <div className="d-flex border rounded">
          <button className="btn" onClick={handleReduce}>-</button>
          <div className="px-3 d-flex align-items-center">
            {quantityHandle}
          </div>
          <button className="btn" onClick={hanldeIncrease}>+</button>
        </div>
      </div>

      {/* ADD CART */}
      <div className="mt-4">
        <button
          className="btn btn-danger w-100"
          onClick={handleCreateCart}
        >
          THÊM VÀO GIỎ
        </button>
      </div>

    </Col>
  </Row>
</Container>
    </>
  );
}
