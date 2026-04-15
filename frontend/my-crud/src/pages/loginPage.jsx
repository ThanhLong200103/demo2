import { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/authAccess";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../services/FactoryService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await RepositoryFactory.get("user").login({
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("accessToken", data.accessToken);
      dispatch(loginSuccess({ token: data.accessToken }));
      navigation("/");
    } catch (error) {
      console.log(error);
      const status = error.response?.status;
      const apiData = error.response?.data;
      const validationErrors = apiData?.error;

      if (status === 422) {
        if (validationErrors?.email) {
          toast.error(validationErrors.email);
        }
        if (validationErrors?.password) {
          toast.error(validationErrors.password);
        }
        if (!validationErrors?.email && !validationErrors?.password) {
          toast.error(apiData?.message || "Đã có lỗi xảy ra");
        }
      } else {
        toast.error(apiData?.message || "Đã có lỗi xảy ra");
      }
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const checkMe = async () => {
        try {
          await RepositoryFactory.get("user").profile();
          navigation("/");
        } catch (error) {
          console.log("Token expired, attempting refresh...");
          toast.error("Phiên đăng nhập hết hạn");
        }
      };
      checkMe();
    }
  }, [navigation]);

  return (
    <>
      <Container className="d-flex justify-content-center mt-5 mb-5">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button className="mt-3 mb-3" variant="danger" type="submit">
              Submit
            </Button>
          </Form>
          <p className="mt-1">Bạn chưa có tài khoản</p>
          <Link to={"/register"}>Đăng ký tài khoản</Link>
        </Col>
      </Container>
    </>
  );
}
