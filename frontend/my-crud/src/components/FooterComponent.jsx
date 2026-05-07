import { Button, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiTiktokFill } from "react-icons/ri";
import "../styles/maxWidth.css";
import { useTranslation } from "react-i18next";
export default function FooterComponent() {
  const { t } = useTranslation("footer");
  return (
    <>
      <Container
        fluid
        style={{ background: "#f5f5f5" }}
        className="z-0  bottom-0 "
      >
        <div className="maxWidth">
          <Row className="  d-flex justify-content-between  ">
            <Col
              className="col-xl-3 col-lg-6 pt-lg-4 pb-lg-3 ps-lg-2  col-md-12 col-12 ps-xs-2  "
              style={{ borderRight: "1px solid #dedede" }}
            >
              <p className="text-danger fw-bold ">{t("footer.card.title")}</p>
              <div>
                <div>
                  <div className="py-1">
                    <p>{t("footer.card.description")}</p>
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
                    <b>{t("footer.card.Method")}</b>
                    <ul className="list-unstyled d-flex  flex-wrap">
                      <li className="m-1">
                        <img
                          className="mt-2"
                          src="//theme.hstatic.net/200000690725/1001078549/14/payment_1_img.png?v=1069"
                          alt="GHN"
                        />
                      </li>
                      <li className="m-2">
                        <img
                          className="h-75 w-100"
                          src="//theme.hstatic.net/200000690725/1001078549/14/payment_2_img.png?v=1069"
                          alt="ninija"
                        />
                      </li>
                      <li className="m-2">
                        <img
                          className="h-75 w-100"
                          src="//theme.hstatic.net/200000690725/1001078549/14/payment_3_img.png?v=1069"
                          alt="Ahamove"
                        />
                      </li>
                      <li className="m-2">
                        <img
                          className="h-75 w-100"
                          src="//theme.hstatic.net/200000690725/1001078549/14/payment_4_img.png?v=1069"
                          alt="J&T"
                        />
                      </li>
                      <li className="m-2">
                        <img
                          className="h-75 w-100"
                          src="//theme.hstatic.net/200000690725/1001078549/14/payment_5_img.png?v=1069"
                          alt="J&T"
                        />
                      </li>
                      <li className="m-2">
                        <img
                          className="h-75 w-100"
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
              <p className="text-danger fw-bold">{t("footer.contact.title")}</p>
              <div>
                <div className="py-1">
                  <ul className="list-unstyled">
                    <li className="mb-1">
                      <b>{t("footer.contact.local")} </b>
                      {t("footer.contact.address")}
                    </li>
                    <li className="mb-1">
                      <b>{t("footer.contact.phone")} </b>
                      {t("footer.contact.number1")}
                    </li>
                    <li className="mb-1">
                      <b>Fax: </b>
                      {t("footer.contact.number2")}
                    </li>
                    <li className="mb-1">
                      <b>{t("footer.contact.email")} </b>
                      {t("footer.contact.mail")}
                    </li>
                  </ul>
                </div>
                <div className="mt-1 mb-1">
                  <b>{t("footer.contact.Method")}</b>
                  <ul className="list-unstyled d-flex  ">
                    <li className="m-1 ">
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
              <p className="text-danger fw-bold">{t("footer.link.title")}</p>

              <ul>
                <li className="m-1">{t("footer.link.search")}</li>
                <li className="m-1">{t("footer.link.about")}</li>
                <li className="m-1">{t("footer.link.return")}</li>
                <li className="m-1">{t("footer.link.privacy")}</li>
                <li className="m-1">{t("footer.link.careers")}</li>
                <li className="m-1">{t("footer.link.contact")}</li>
              </ul>
            </Col>
            <Col className="col-xl-3 col-lg-6 pt-lg-4 pb-lg-3 ps-lg-2  col-md-12 col-12 ps-xs-2   ">
              <p className="text-danger fw-bold">{t("footer.register.title")}</p>
              <div>
                <p>
                  {t("footer.register.description")}
                </p>
                <div>
                  <InputGroup>
                    <Form.Control placeholder={t("footer.register.placeholder")} />
                    <Button variant="primary">{t("footer.register.button")}</Button>
                  </InputGroup>
                </div>
                <div className="mt-lg-3">
                  <a
                    href="http://online.gov.vn/Home/WebDetails/47936?AspxAutoDetectCookieSupport=1"
                    target="_blank"
                  >
                    <img
                      src="//theme.hstatic.net/200000690725/1001078549/14/footer_logobct_img.png?v=1069"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
          <Row
            className="d-flex justify-content-center text-center py-2"
            style={{ borderTop: "1px solid #dedede" }}
          >
            <Col>{t("footer.text")}</Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
