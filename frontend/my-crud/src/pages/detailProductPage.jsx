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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../api/axios";
export default function DetailProductPage() {
    const[products, setProducts] = useState([])
    const[productItem , setProductItem]= useState({})
    const [quantityHandle , setQuantityHanlde] = useState(1)
    const { id } = useParams();
    useEffect(
      ()=>{
        const getProduct = async  ()=>{
          try {
               const res = await RepositoryFactory.get("product").getAll();
               const product = await RepositoryFactory.get("product").getById(id)
             setProducts(res)
             setProductItem(product[0])
             console.log(res)
             console.log(product)
          } catch (error) {
            console.log(error)
          }
        }

        getProduct()
      },[]
    )

    const handleReduce= ()=>{
      if(quantityHandle <=1){
        toast.warning("Không thể thực hiện")
      }else{
        setQuantityHanlde((item)=>item-1);
        
      }
    }
    const hanldeIncrease = ()=>{
       if(quantityHandle>=productItem.quantity){
        toast.warning("Số lượng còn lại không đủ")
      }else{
        setQuantityHanlde((item)=>item+1);
      }
    }

    const handleCreateCart = async ()=>{
       try {
      const response = await axiosClient.get("/cart");

      const cartId = response.id;
      console.log(cartId, productItem, quantityHandle);
      await axiosClient.post("/cartitem/create", {
        productId : productItem.id,
        quantity : quantityHandle,
        cartId,
      });

      toast.success("Thêm sản phẩm thành công")
      // d(indexCountItem(countItem+1))
      
    } catch (err) {
      toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng");
      console.log(err)
    }
    }
    const handleOder = ()=>{
      
    }
  return (
    <>
      <Container fluid className="">
        <div className="maxWidth">
          <Row className="d-flex">
            <Col md={12} lg={4}>
              <div
                className="w-100 mb-3 mt-5  "
                style={{ height: "auto", overflow: "hidden" }}
              >
                <img
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  src={productItem.img}
                  alt="product1"
                />
              </div>
              <div className="mt-2  text-center">
                <ul className="list-unstyled row row-cols-6 g-1">
                  <li className="col">
                    <img
                      className="img-fluid border"
                      src={productItem.img}
                      alt=""
                    />
                  </li>
                  <li className="col">
                    <img
                      className="img-fluid border"
                      src="//product.hstatic.net/200000690725/product/tp038---bt019-den_3__aad19632f25a4e49913e1d80e2a5919c_compact.jpg"
                      alt=""
                    />
                  </li>
                  <li className="col">
                    <img
                      className="img-fluid border"
                      src="//product.hstatic.net/200000690725/product/tp038---bt019-den_12__096f638857f6470d82c09e80ec8e6971_compact.jpg"
                      alt=""
                    />
                  </li>
                  <li className="col">
                    <img
                      className="img-fluid border"
                      src="//product.hstatic.net/200000690725/product/tp038-42_52761813873_o_20dead3d93b34d1188bea7b4ce83cd3d_compact.jpg"
                      alt=""
                    />
                  </li>
                  <li className="col">
                    <img
                      className="img-fluid border"
                      src="//product.hstatic.net/200000690725/product/tp038-43_52761730015_o_888bb61714e74a46b53ce1448cd8d7a9_compact.jpg"
                      alt=""
                    />
                  </li>
                  <li className="col">
                    <img
                      className="img-fluid border"
                      src="//product.hstatic.net/200000690725/product/tp038-44_52761813818_o_3c7be9734f504ab2a937d3a5f62f80d2_compact.jpg"
                      alt=""
                    />
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={12} lg={8}  className="border-start">
              <div style={{ width: "70%" }} className="mt-2">
                <div>
                  <h1>{productItem.name}</h1>
                </div>
                <div>
                  <span className="pe-2 border-end"> Mã sản phẩm : <b className="fw-bold">Test</b> </span>
                  <span className="px-2 border-end">
                    {" "}
                    Tình trạng :<b className="fw-bold">{productItem.quantity>0 ? "Còn hàng" :"Hết hàng"}</b>
                  </span>
                  <span className="ps-2">
                    Thương hiệu : <b className="fw-bold">TORANO</b>
                  </span>
                </div>
                <div>
                  <div
                    className="d-flex gap-3 py-3 ps-2 mt-3 "
                    style={{ background: "#f5f5f5", borderRadius: "5px" }}
                  >
                    <span className="me-5 fw-bold ">Giá :</span>
                    <span className="text-danger fw-bold">{productItem.price?.toLocaleString()}</span>
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
                        <span className="fw-bold ">Màu sắc:</span>
                      </Col>
                      <Col
                        xs={8}
                        md={9}
                        lg={10}
                        className="d-flex flex-wrap gap-2"
                      >
                        <div
                          className="border border-dark rounded px-4 py-2"
                          style={{ cursor: "pointer" }}
                        >
                          Đen
                        </div>
                        <div
                          className="border rounded px-4 py-2"
                          style={{ cursor: "pointer" }}
                        >
                          Xanh da trời đậm 1
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col xs={4} md={3} lg={2} className="pt-2">
                        <span className="fw-bold">Kích thước:</span>
                      </Col>
                      <Col xs={8} md={9} lg={10}>
                     
                        <div className="d-flex flex-wrap gap-2 mb-2">
                          <div
                            className="border rounded d-flex justify-content-center align-items-center"
                            style={{
                              cursor: "pointer",
                              width: "80px",
                              height: "45px",
                            }}
                          >
                            S
                          </div>
                          <div
                            className="border rounded d-flex justify-content-center align-items-center"
                            style={{
                              cursor: "pointer",
                              width: "80px",
                              height: "45px",
                            }}
                          >
                            M
                          </div>
                          <div
                            className="border rounded d-flex justify-content-center align-items-center"
                            style={{
                              cursor: "pointer",
                              width: "80px",
                              height: "45px",
                            }}
                          >
                            L
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-end">
                          <div className="d-flex flex-wrap gap-2">
                            <div
                              className="border rounded d-flex justify-content-center align-items-center"
                              style={{
                                cursor: "pointer",
                                width: "80px",
                                height: "45px",
                              }}
                            >
                              XL
                            </div>
                            <div
                              className="border rounded d-flex justify-content-center align-items-center"
                              style={{
                                cursor: "pointer",
                                width: "80px",
                                height: "45px",
                              }}
                            >
                              XXL
                            </div>
                          </div>
                          <a
                            href="#"
                            className="text-dark"
                            style={{
                              textDecoration: "underline",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            Hướng dẫn chọn size
                          </a>
                        </div>
                      </Col>
                    </Row>
                  </Form>

                  <Row className="align-items-center mt-4">
                    <Col xs={4} md={3} lg={2}>
                      <span className="fw-bold">Số lượng:</span>
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
                          onClick={()=>{handleReduce()
                          }
                          }
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
                          onClick={()=>{
                            hanldeIncrease()
                          }
                          }
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

                    onClick={()=>{
                      handleCreateCart()
                    }}
                  >
                    THÊM VÀO GIỎ
                  </Button>
                  <Button
                    className=" py-2 bg-danger border-danger"
                    style={{ width: "45%" }}
                    onClick={()=>{
                      handleOder()
                    }}
                  >
                    MUA NGAY
                  </Button>
                </div>
                <button className="w-100 border-0  bg-black text-white py-3 mt-4" style={{borderRadius:"5px"}}>
                  CLICK VÀO ĐÂY ĐỂ NHẬN ƯU ĐÃI
                </button>
              </div>
              <div className=" mt-3">
                <ul className="list-unstyled d-flex justify-content-start gap-2  ">
                  <li className="me-5 mt-3 fw-bold">Chia sẻ:</li>
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
                  <li className="col-lg-4 col-md-12 p-2">Miễn phí giao hàng cho đơn hàng từ 500K</li>
                  <li  className="col-lg-4 col-md-12 p-2">Hàng phân phối chính hãng 100%</li>
                  <li className="col-lg-4 col-md-12 p-2">TỔNG ĐÀI 24/7 : 0964942121 </li>
                  <li  className="col-lg-4 col-md-12 p-2">
                    ĐỔI SẢN PHẨM DỄ DÀNG (Trong vòng 7 ngày khi còn nguyên tem
                    mác)
                  </li>
                  <li className="col-lg-4 col-md-12 p-2">Kiểm tra, thanh toán khi nhận hàng COD</li>
                  <li className="col-lg-4 col-md-12 p-2">Hỗ trợ bảo hành, đổi sản phẩm tại tất cả store TORANO</li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 text-center my-4" >
            <h2>Sản phẩm liên quan</h2>
            </Col>
            <ProductComponent products={products}></ProductComponent>
          </Row>
        </div>
      </Container>
    </>
  );
}
