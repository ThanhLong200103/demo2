import { Button, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiTiktokFill } from "react-icons/ri";
export default function FooterComponent() {
  return (
    <>
      <Container fluid style={{background :"#f5f5f5"}}>
        <Row className="d-flex justify-content-between ">
          <Col
            className="col-xl-3 col-lg-6 pt-lg-4 pb-lg-3 ps-lg-2  col-md-12 col-12 ps-xs-2  "
            style={{ borderRight: "1px solid #dedede" }}
          >
            <p className="text-danger fw-bold ">Thời trang nam TORANO</p>
            <div>
              <div>
                <div className="py-1">
                  <p>
                    Hệ thống thời trang cho phái mạnh hàng đầu Việt Nam, hướng
                    tới phong cách nam tính, lịch lãm và trẻ trung.
                  </p>
                  <ul className="list-unstyled d-flex gap-2">
                    <li>
                      <AiOutlineFacebook className="fs-3" />
                    </li>
                    <li>
                      <FaTwitter className="fs-3" />
                    </li>
                    <li>
                      <FaInstagram className="fs-3" />
                    </li>
                    <li>
                      <RiTiktokFill className="fs-3" />
                    </li>
                    <li>
                      <FaYoutube className="fs-3" />
                    </li>
                  </ul>
                </div>
                <div className="mt-1 mb-1">
                  <b>Phương thức thanh toán</b>
                  <ul className="list-unstyled d-flex  flex-wrap">
                    <li className="m-1">
                      <img
                        src="//theme.hstatic.net/200000690725/1001078549/14/payment_1_img.png?v=1069"
                        alt="GHN"
                      />
                    </li>
                    <li className="m-2">
                      <img
                        src="//theme.hstatic.net/200000690725/1001078549/14/payment_2_img.png?v=1069"
                        alt="ninija"
                      />
                    </li>
                    <li className="m-2">
                      <img
                        src="//theme.hstatic.net/200000690725/1001078549/14/payment_3_img.png?v=1069"
                        alt="Ahamove"
                      />
                    </li>
                    <li className="m-2">
                      <img
                        src="//theme.hstatic.net/200000690725/1001078549/14/payment_4_img.png?v=1069"
                        alt="J&T"
                      />
                    </li>
                    <li className="m-2">
                      <img
                        src="//theme.hstatic.net/200000690725/1001078549/14/payment_5_img.png?v=1069"
                        alt="J&T"
                      />
                    </li>
                    <li className="m-2">
                      <img
                        src="//theme.hstatic.net/200000690725/1001078549/14/payment_6_img.png?v=1069"
                        alt="J&T"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
          <Col
            className="col-xl-3 col-lg-6 pt-lg-4 pb-lg-3 ps-lg-2  col-md-12 col-12 ps-xs-2   "
            style={{ borderRight: "1px solid #dedede" }}
          >
            <p className="text-danger fw-bold">Thông tin liên hệ</p>
            <div>
              <div className="py-1">
                <ul className="list-unstyled">
                  <li className="mb-1">
                    <b>Địa chi: </b>
                    Tầng 8, Tòa nhà 311-313 Trường Chinh, Phường Phương Liệt,
                    Thành phố Hà Nội, Việt Nam
                  </li>
                  <li className="mb-1">
                    <b>Điện thoại: </b>
                    0964942121
                  </li>
                  <li className="mb-1">
                    <b>Fax: </b>
                    0904636356
                  </li>
                  <li className="mb-1">
                    <b>Email: </b>
                    cskh@torano.vn
                  </li>
                </ul>
              </div>
              <div className="mt-1 mb-1">
                <b>Phương thức vận chuyển</b>
                <ul className="list-unstyled d-flex  ">
                  <li className="m-1">
                    <img
                      src="//theme.hstatic.net/200000690725/1001078549/14/shipment_1_img.png?v=1069"
                      alt="GHN"
                    />
                  </li>
                  <li className="m-1">
                    <img
                      src="//theme.hstatic.net/200000690725/1001078549/14/shipment_2_img.png?v=1069"
                      alt="ninija"
                    />
                  </li>
                  <li className="m-1">
                    <img
                      src="//theme.hstatic.net/200000690725/1001078549/14/shipment_3_img.png?v=1069"
                      alt="Ahamove"
                    />
                  </li>
                  <li className="m-1">
                    <img
                      src="//theme.hstatic.net/200000690725/1001078549/14/shipment_4_img.png?v=1069"
                      alt="J&T"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col
            className="col-xl-3 col-lg-6 pt-lg-4 pb-lg-3 ps-lg-2  col-md-12 col-12  ps-xs-2   "
            style={{ borderRight: "1px solid #dedede" }}
          >
            <p className="text-danger fw-bold"> Nhóm liên kết</p>

            <ul>
              <li className="m-1">Tìm kiếm</li>
              <li className="m-1">Giới thiệu</li>
              <li className="m-1">Chính sách đổi trả</li>
              <li className="m-1">Chính sách bảo mật</li>
              <li className="m-1">Tuyển dụng</li>
              <li className="m-1">Liên hệ</li>
            </ul>
          </Col>
          <Col className="col-xl-3 col-lg-6 pt-lg-4 pb-lg-3 ps-lg-2  col-md-12 col-12 ps-xs-2   ">
            <p className="text-danger fw-bold"> Đăng ký nhận tin</p>
            <div>
              <p>
                Để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt
                và thông tin giảm giá khác.
              </p>
              <div>
                <InputGroup>
                  <Form.Control placeholder="Nhập email của bạn" />
                  <Button variant="primary">Đăng ký</Button>
                </InputGroup>
              </div>
              <div className="mt-lg-3">
                <a href="http://online.gov.vn/Home/WebDetails/47936?AspxAutoDetectCookieSupport=1" target="_blank"><img src="//theme.hstatic.net/200000690725/1001078549/14/footer_logobct_img.png?v=1069" alt="" /></a>
              </div>
            </div>
          </Col>
        </Row>
        <Row 
          className="d-flex justify-content-center text-center py-2"
          style={{ borderTop: "1px solid #dedede" }}
        >
          <Col>Copyright © 2026 Torano. Powered by Haravan</Col>
        </Row>
      </Container>
    </>
  );
}
