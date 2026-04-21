import { Button, Col, Container, Row } from "react-bootstrap";
import { MdOutlineAddShoppingCart, MdOutlineShoppingBag } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import "../styles/hoverProduct.css";
import { useDispatch } from "react-redux";
import { openDetail } from "../redux/features/detail";
import axiosClient from "../api/axios";
import { indexCountItem } from "../redux/features/cart";
import { Link } from "react-router-dom";
export default function ProductComponent({ products }) {
  const d = useDispatch();
  const quantity = 1;
  console.log(products);
  const handleCreateCart = async (productId, quantity) => {
    try {
      const response = await axiosClient.get("/cart");

      const cartId = response.id;
      console.log(cartId, productId, quantity);
      await axiosClient.post("/cartitem/create", {
        productId,
        quantity,
        cartId,
      });

      alert("Added to cart!");
      // d(indexCountItem(countItem+1))
      setProducts(
        products.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - quantity } : p,
        ),
      );
    } catch (err) {
      toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng");
    }
  };
  return (
    <>
      <Container fluid style={{ cursor: "pointer" }}>
        <Row className="d-flex justify-content-center  mb-4  mt-4 ">
          {products.map((product) => (
            <Col
              md={4}
              xs={6}
              lg={2}
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
                <div className="position-absolute img2  top-0 h-100 w-100 ">
                  <div className=" position-relative top-0 h-100 w-100 text-center">
                    <Button as={Link} to={`products/${product.id}`} className="border-0 bg-white w-100 h-100">
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
                      className="position-absolute gap-2 ms-4 mb-3  d-xs-none d-sm-none d-md-none d-lg-flex"
                      style={{ top: "80%" }}
                    >
                      <Button
                        className="text-center px-2  text-black bg-white "
                        style={{ maxHeight: "60px" }}
                        onClick={() => {
                          handleCreateCart(product.id, quantity);
                        }}
                      >
                        <MdOutlineShoppingBag className="p-0 mb-1" />
                        Thêm vào giỏ
                      </Button>
                      <Button
                        className="text-white bg-black border-0"
                        style={{ maxHeight: "60px" }}
                        onClick={() => {
                          d(openDetail(true));
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

              <div className="pt-1 d-flex flex-column flex-grow-1">
                <div className="d-flex justify-content-between">
                  <p className="mb-1">+ màu sắc</p>
                  <p className="mb-1">+ kích thước</p>
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
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
