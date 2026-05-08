import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import "../styles/address.css";
import { useDispatch, useSelector } from "react-redux";
import { closeAddress, setAddressAll, setAddressTrue } from "../redux/features/address";
import { IoCloseOutline, IoCloseSharp } from "react-icons/io5";
import { RepositoryFactory } from "../services/FactoryService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddressUserComponent({ showAddress }) {
  const d = useDispatch();
  const { addressAll } = useSelector((state) => state.address);
  const [address, setAddress] = useState([]);
  const [showId, setShowId] = useState();
  const [addressData, setAddressData] = useState({
    id:"",
    home_number: "",
    district: "",
    province: "",
    is_default: "",
  });
  // console.log("địa chỉ qua đây",addressAll)
  const handleDelete = async (id) => {
    // console.log("Id xóa :",id)
    try {
      await RepositoryFactory.get("addressUser").deleteAddressUser(id);
      const updatedList = address.filter((item) => item.id !== id);
      setAddress(updatedList);
      toast.success("Xóa địa chỉ thành công");
    } catch (error) {
      console.log(error);
      toast.warning("Vui lòng thử lại sau");
    }
  };
  useEffect(() => {
    setAddress(addressAll);
  }, [addressAll]);
  const handleChangeAddress = (e) => {
    const { name, value, type, checked } = e.target;

    setAddressData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleUpdate = async (id) => {
    try {
      console.log("Địa chỉ khi update : ", addressData);
      await RepositoryFactory.get("addressUser").editAddressUser(addressData)
      const data =
              await RepositoryFactory.get("addressUser").getAllAddressUser();
            // console.log("Địa chỉ user :", data);
            d(setAddressAll(data[0]));
                  d(setAddressTrue(data[1]))
                  d(closeAddress(false))
            
    } catch (error) {
        console.log(error)
      const apiData = error.response?.data;

        if ( error.response?.status){
           toast.warning(apiData.message)
        }
    }
  };

  return (
    <>
      <div
        className={`address-overlay ${showAddress ? "active" : ""} `}
        onClick={() => {
          d(closeAddress(false));
        }}
      ></div>
      <Container className={` address ${showAddress ? "active" : ""}`}>
        <Row style={{ background: "" }}>
          <div className="d-flex justify-content-between  py-4 border-bottom fs-6 px-4 fw-bold ">
            <Col className="">Chọn địa chỉ nhận hàng</Col>
            <Col className="text-end">
              <Button
                className="bg-white border-0 text-black fs-2"
                onClick={() => {
                  d(closeAddress(false));
                }}
              >
                <IoCloseOutline />
              </Button>
            </Col>
          </div>
        </Row>
        <Row style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            {address?.map((item) => (
              <div
                key={item.id}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 0",
                  borderBottom: "1px solid #f0f0f0",
                }}
                className="position-relative"
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        marginRight: "10px",
                      }}
                    >
                      {item.name || "Người nhận"} | {item.phone || "SĐT"}
                    </span>
                  </div>
                  {item.is_default === 1 && (
                    <span
                      style={{
                        backgroundColor: "#f5222d",
                        color: "#fff",
                        fontSize: "12px",
                        padding: "1px 5px",
                        borderRadius: "10px",
                        minWidth: "80px",
                        textAlign: "center",
                      }}
                    >
                      Mặc định
                    </span>
                  )}
                  <div style={{ color: "#8c8c8c", fontSize: "14px" }}>
                    {item.home_number}
                  </div>
                  <div style={{ color: "#8c8c8c", fontSize: "14px" }}>
                    {item.district}, {item.province}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "10px",
                  }}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      type="text"
                      style={{
                        background: "#f5f5f5",
                        color: "#000",
                        border: "none",
                        borderRadius: "8px",
                        padding: "4px 14px",
                        height: "36px",
                        fontWeight: 500,
                      }}
                      onClick={() => {
                        setShowId((prev) =>
                          prev === item.id ? null : item.id,
                        );
                        setAddressData({
                            id:item.id,
                          home_number: item.home_number,
                          district: item.district,
                          province: item.province,
                          is_default: item.is_default,
                        });
                      }}
                    >
                      Cập nhật
                    </Button>

                    {item.is_default !== 1 && (
                      <Button
                        type="text"
                        style={{
                          background: "#f5f5f5",
                          color: "#000",
                          border: "none",
                          borderRadius: "8px",
                          padding: "4px 14px",
                          height: "36px",
                          fontWeight: 500,
                        }}
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Xóa
                      </Button>
                    )}
                  </div>
                </div>
                <div className={`mt-3   ${showId !== item.id && "d-none"}`}>
                  <Form>
                    <Button
                      className="fs-5 bg-white border-0 text-black  "
                      style={{ marginLeft: "90%" }}
                      onClick={() => {
                        setShowId(null);
                      }}
                    >
                      <IoCloseSharp />
                    </Button>
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
                    <Form.Check
                      type="checkbox"
                      label="Đặt làm địa chỉ mặc định"
                      name="is_default"
                      checked={addressData.is_default}
                      onChange={handleChangeAddress}
                    />
                    <Button
                      onClick={() => {
                        handleUpdate(item.id);
                      }}
                    >
                      Update
                    </Button>
                  </Form>
                </div>
              </div>
            ))}
          </div>
        </Row>
      </Container>
    </>
  );
}
