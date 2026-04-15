import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../services/FactoryService";
import { loginSuccess } from "../redux/features/authAccess";
import { Link } from "react-router-dom";

export default function LoginComponent({show, setShow}) {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
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
        setShow(false)
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
    return (
    <Modal
      show={show} 
      onHide={() => setShow(false)} 
      centered
    >
      <Modal.Body className="p-4">
        
        <h5 className="text-center mb-3">
          ĐĂNG NHẬP TÀI KHOẢN
        </h5>

        <p className="text-center text-muted">
          Nhập email và mật khẩu của bạn:
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Email"  value={email}
                onChange={(e) => setEmail(e.target.value)}  />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Mật khẩu"  value={password}
                onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button 
            variant="danger" 
            className="w-100"
            type="submit"
          >
            ĐĂNG NHẬP
          </Button>
        </Form>

        <div className="text-center mt-3">
          <small>
            Khách hàng mới? <Link  to={'/register'}>Tạo tài khoản</Link>
          </small>
          <br />
          <small>
            Quên mật khẩu? <a href="#">Khôi phục mật khẩu</a>
          </small>
        </div>

      </Modal.Body>
    </Modal>
  );
};
