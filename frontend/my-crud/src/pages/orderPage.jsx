import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../api/axios";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../services/FactoryService";
import { useDispatch, useSelector } from "react-redux";
import { CiCircleChevDown, CiLocationOn } from "react-icons/ci";
import { MdNavigateNext } from "react-icons/md";
import { openAddress, setAddressAll, setAddressTrue } from "../redux/features/address";

export default function OrderPage() {
  const location = useLocation();
  const {
    totalPrice,
    selectedIds,
    productId,
    quantityHandle,
    priceProduct,
    attributeId,
    nameProduct,
    imgProduct,
    selectedColor,
    selectedSize,
  } = location.state || {};
  console.log(location.state);
  const [orderItems, setOrderItems] = useState([]);
  // const [address, setAddress] = useState();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [addressData, setAddressData] = useState({
    home_number: "",
    district: "",
    province: "",
    is_default: false,
  });
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { addressTrue } = useSelector((state) => state.address);

  const d = useDispatch();
  //  console.log(location)
  console.log(totalPrice, selectedIds);
  useEffect(() => {
    const checkItemOder = async () => {
      try {
        if (selectedIds.length > 0) {
          const data =
            await RepositoryFactory.get("order").getItemOrder(selectedIds);
          setOrderItems(data);
          // console.log(data)
          // console.log(orderItems);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkItemOder();
  }, []);
  useEffect(() => {
    // console.log(orderItems);
    const getAddressUser = async () => {
      try {
        const data =
          await RepositoryFactory.get("addressUser").getAllAddressUser();
        console.log("Địa chỉ user :", data);
        // setAddress(data[1]);
      d(setAddressTrue(data[1]))
        d(setAddressAll(data[0]));
      } catch (error) {
        console.log(error);
      }
    };
    getAddressUser();
  }, [orderItems]);
  const handleOrder = async () => {
    try {
      const pay = await RepositoryFactory.get("order").create({
        cartItemIds: selectedIds,

        totalPrice: totalPrice,
        productId: productId,
        quantityProduct: quantityHandle,
        priceProduct: priceProduct,
        attributeId: attributeId,
      });
      console.log(pay);
      toast.success("Đặt hàng thành công");
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.status === 422) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Đặt hàng thất bại");
      }
    }
  };
  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleOnlinePayment = async () => {
    try {
      const pay = await RepositoryFactory.get("vnpay").createPayment({
        cartItemIds: selectedIds,
        totalPrice: totalPrice,
        productId: productId,
        quantityProduct: quantityHandle,
        priceProduct: priceProduct,
        attributeId: attributeId,
      });
      console.log(pay);
      const orderId = pay[0];
      console.log(orderId);
      toast.success("Đã chuyển hướng đến cổng thanh toán");
      navigate("/payment", {
        state: { orderId: orderId, totalPrice: totalPrice },
      });
    } catch (error) {
      console.log(error);
      if (error.status === 422) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Thanh toán thất bại số lượng hàng trong kho không đủ");
      }
    }
  };
  const handleChangeAddress = (e) => {
    const { name, value } = e.target;

    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddress = async () => {
    try {
      // console.log("Giá trị của add address là : ", addressData);
      await RepositoryFactory.get("addressUser").createAddressUser(addressData);
      const data =
        await RepositoryFactory.get("addressUser").getAllAddressUser();
      // console.log("Địa chỉ user :", data);
      // setAddress(data[1]);
      d(setAddressTrue(data[1]))
      d(setAddressAll(data[0]));
      setAddressData({
        home_number: "",
        district: "",
        province: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container className="py-5" style={{ maxWidth: "" }}>
        <Row className="d-flex justify-content-center flex-wrap">
          <Col md={6}>
            <h3 className="fw-bold mb-4">Địa chỉ nhận hàng </h3>
            <div className="mb-5">
              <Button
                className="w-100 border-0 text-black d-flex"
                style={{ background: "#f5f5f5" }}
                onClick={() => {
                  d(openAddress(true));
                }}
              >
                {addressTrue?.map((a) => (
                  <div className="w-100 p-0 m-0">
                    <div className="d-flex justify-content-center gap-3 p-0 m-0">
                      <p className="fw-bold p-0 m-0">
                        {" "}
                        <CiLocationOn /> {a.name}
                      </p>
                      <b>{a.phone}</b>
                    </div>
                    <p className="p-0 m-0">
                      {" "}
                      {a.home_number}, {a.district}, {a.province}
                    </p>
                  </div>
                ))}
                <MdNavigateNext className="mt-auto mb-auto" />
              </Button>
            </div>

            <div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  {/* <Form.Label>Số nhà </Form.Label> */}

                  <Form.Control
                    type="text"
                    placeholder="Số nhà"
                    name="home_number"
                    value={addressData.home_number}
                    onChange={handleChangeAddress}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  {/* <Form.Label>Huyện/Phường/Xã</Form.Label> */}

                  <Form.Control
                    type="text"
                    placeholder="Huyện/Phường/Xã"
                    name="district"
                    value={addressData.district}
                    onChange={handleChangeAddress}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  {/* <Form.Label>Tỉnh/Thành phố</Form.Label> */}

                  <Form.Control
                    type="text"
                    placeholder="Tỉnh/Thành phố"
                    name="province"
                    value={addressData.province}
                    onChange={handleChangeAddress}
                  />
                </Form.Group>

                <Button
                  onClick={() => {
                    handleAddress();
                  }}
                >
                  Thêm địa chỉ nhận hàng
                </Button>
              </Form>
            </div>
          </Col>
          <Col md={6}>
            <h3 className="fw-bold mb-4">Xác nhận đơn hàng</h3>

            <div className="mb-4">
              <h5 className="mb-3">Sản phẩm đã chọn</h5>
              {selectedIds ? (
                orderItems.map((item) => (
                  <Card key={item.id} className="mb-2 border-0 shadow-sm">
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col xs={3} md={2}>
                          <img
                            src={item.img}
                            alt={item.name}
                            className="img-fluid rounded"
                          />
                        </Col>
                        <Col xs={5} md={6}>
                          <h6 className="mb-0">{item.name}</h6>
                          <small className="text-muted">
                            Số lượng: {item.quantity}
                          </small>
                        </Col>
                        <Col
                          xs={4}
                          md={4}
                          className="text-end text-danger fw-bold"
                        >
                          {(item.price * item.quantity).toLocaleString()} đ
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Card key={productId} className="mb-2 border-0 shadow-sm">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={3} md={2}>
                        <img
                          src={imgProduct}
                          alt={nameProduct}
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col xs={5} md={6}>
                        <h6 className="mb-0">{nameProduct}</h6>
                        <small className="text-muted">
                          Số lượng: {quantityHandle}
                        </small>
                        <p className="d-flex gap-3">
                          <small className="text-muted">
                            Màu sắc: {selectedColor}
                          </small>
                          <small className="text-muted">
                            Cỡ: {selectedSize}
                          </small>
                        </p>
                      </Col>
                      <Col
                        xs={4}
                        md={4}
                        className="text-end text-danger fw-bold"
                      >
                        {priceProduct.toLocaleString()} đ
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}
            </div>

            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <h5 className="mb-3">Phương thức thanh toán</h5>
                <Form>
                  <div className="p-3 border rounded mb-2">
                    <Form.Check
                      type="radio"
                      id="payment-cod"
                      label={
                        <div className="ms-2">
                          <strong>Thanh toán khi nhận hàng (COD)</strong>
                          <br />
                          <small className="text-muted">
                            Giao hàng và thu tiền tận nơi
                          </small>
                        </div>
                      }
                      name="paymentMethod"
                      value={"COD"}
                      onChange={handleChange}
                      defaultChecked
                    />
                  </div>
                  <div className="p-3 border rounded">
                    <Form.Check
                      type="radio"
                      id="payment-online"
                      label={
                        <div className="ms-2">
                          <strong>Thanh toán trực tuyến</strong>
                          <br />
                          <small className="text-muted">
                            Qua cổng VNPAY (Thẻ ATM, QR Code, Visa/Master)
                          </small>
                        </div>
                      }
                      value={"VNPAY"}
                      name="paymentMethod"
                      onChange={handleChange}
                    />
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <Card className="shadow-sm border-0 bg-light">
              <Card.Body className="d-flex justify-content-between align-items-center py-4">
                <div>
                  <span className="text-muted">Tổng cộng:</span>
                  <h3 className="text-danger fw-bold mb-0">
                    {totalPrice?.toLocaleString()} đ
                  </h3>
                </div>
                {paymentMethod === "COD" ? (
                  <Button
                    variant="danger"
                    size="lg"
                    className="px-5 fw-bold"
                    onClick={handleOrder}
                  >
                    Xác nhận đặt hàng COD
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    size="lg"
                    className="px-5 fw-bold"
                    onClick={handleOnlinePayment}
                  >
                    Xác nhận đặt hàng VNPAY
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
