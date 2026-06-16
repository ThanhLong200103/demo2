import { Button, Col, Container, Row } from "react-bootstrap";
import { MdAddShoppingCart, MdOutlineAddShoppingCart, MdOutlineShoppingBag } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import "../styles/hoverProduct.css";
import { useDispatch } from "react-redux";
import { openDetail } from "../redux/features/detail";
import axiosClient from "../api/axios";
import { indexCountItem } from "../redux/features/cart";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
export default function ProductComponent({ products ,cursor }) {
  const d = useDispatch();
  const n  = useNavigate();
  const quantity = 1;
  const { t } = useTranslation("product");
  // console.log(products);
  // const handleCreateCart = async (productId, quantity) => {
  //   try {
  //     const response = await axiosClient.get("/cart");

  //     const cartId = response.id;
  //     console.log(cartId, productId, quantity);
  //     await axiosClient.post("/cartitem/create", {
  //       productId,
  //       quantity,
  //       cartId,
  //     });

  //     alert("Added to cart!");
  //     // d(indexCountItem(countItem+1))
  //     setProducts(
  //       products.map((p) =>
  //         p.id === productId ? { ...p, quantity: p.quantity - quantity } : p,
  //       ),
  //     );
  //   } catch (err) {
  //     toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng");
  //   }
  // };

  const handleClickProduct = (id)=>{
    n(`products/${id}`)
  }
 
  return (
    <>
      <Container fluid style={{ cursor: "pointer" ,minHeight:"110vh"}}>
        <Row className="d-flex justify-content-center  mb-4  mt-4 ">
          {products.map((product) => (
            <Col
              md={4}
              xs={6}
              lg={3}
              className="bg-white d-flex flex-column"
              key={product.id}
            >
              <div className="w-100 position-relative product-img-wrapper">
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: "100%", height: "100%" }}
                  className="img1"
                />
                <div className="position-absolute img2  top-0 h-100 w-100 d-md-none d-lg-block ">
                  <div className=" position-relative top-0 h-100 w-100 text-center">
                    <Button as={Link} to={`/products/${product.id}`} className="border-0 bg-white w-100 h-100">
                      <img
                        src={
                          "//product.hstatic.net/200000690725/product/2f9a4efd-a421-4626-bc7f-2f8abad98f3b_339ece4bffb048b3947389caf46108f3_master.jpg"
                        }
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          top: "0",
                          right: "0",
                        }}
                        className=""
                      />
                    </Button>

                    <div
                      className="position-absolute  ms-2 mb-3 w-75 gap-5 justify-content-center d-xs-none d-sm-none d-md-none d-lg-flex"
                      style={{ bottom: "10px", left: "10px" }}
                    >
                      <Button
                        className="text-start   text-black bg-white  "
                        style={{ maxHeight: "60px "}}
                      onClick={() => {
                          d(openDetail({showDetail:true , productId:product.id}));
                        }}
                      >
                        <MdOutlineShoppingBag className="p-0 mb-1 " />
                        {t("product.addcart")}
                      </Button>
                      <Button
                        className="text-white bg-black border-0"
                        style={{ maxHeight: "60px" }}
                        onClick={() => {
                           d(openDetail({showDetail:true , productId:product.id}));
                        }}
                      >
                        <IoEyeSharp />
                      </Button>
                    </div>
                  </div>
                </div>
                <p
                  className="position-absolute top-0 border bg-danger text-white text-center mt-1 ms-1 border-0 z-5"
                  style={{ width: "50px", borderRadius: "10px" }}
                >
                  -99%
                </p>
              </div>

              <div className="pt-1 d-flex flex-column flex-grow-1 position-relative">
                <div className="d-flex justify-content-between">
                  <p className="mb-1">{t("product.color")}</p>
                  <p className="mb-1">{t("product.size")}</p>
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
                  <p className="position-absolute bottom-1  d-lg-none d-md-block  " style={{right:"0"}} 
                   onClick={() => {
                          d(openDetail({showDetail:true , productId:product.id}));
                        }}>
                    <MdAddShoppingCart />
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
