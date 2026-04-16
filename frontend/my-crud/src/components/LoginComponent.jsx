import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../services/FactoryService";
import { loginSuccess } from "../redux/features/authAccess";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import "../styles/form.css";
export default function LoginComponent({setShowLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const n = useNavigate();
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
      setShow(false);
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

  const onclickRegister=()=>{
    setShowLogin(false)
    n("/account")
  }
  return (
    <>
     
      <div 
      onClick={(e) => e.stopPropagation()} 
    >
      <div className="login-modal  position-absolute text-center rounded shadow ">
        <div>
          <div>
            <p className="mb-2 tileLogin">ĐĂNG NHẬP TÀI KHOẢN</p>
            <p style={{ fontSize: "14px" }}>Nhập email và mật khẩu của bạn</p>
          </div>
          <div className="border-top">
            <Form>
              <Form.Group
                className="mb-3  form-group"
                controlId="formBasicEmail"
              >
                <Form.Control
                  className="form-control"
                  type="email"
                  value={email}
                  placeholder=" "
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderRadius: 0 }}
                />
                <Form.Label className="form-label">Email</Form.Label>
              </Form.Group>
              <Form.Group
                className="mb-3  form-group"
                controlId="formBasicEmail"
              >
                <Form.Control
                  className="form-control"
                  type="email"
                  value={password}
                  placeholder=" "
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderRadius: 0 }}
                />
                <Form.Label className="form-label">Mật khẩu</Form.Label>
              </Form.Group>
              <div className="textFromLogin">
                This site is protected by reCAPTCHA and the Google
                <a
                  href="https://policies.google.com/privacy"
                  style={{ color: "#2962ff" }}
                >
                  Privacy Policy
                </a>
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  style={{ color: "#2962ff" }}
                >
                  Terms of Service
                </a>{" "}
                apply.
              </div>
              <Button
                
                type="submit"
                className="w-100 mt-3  border-0 "
                style={{background:"rgb(245,245,245)",color:"#d30000" ,cursor:"pointer"}}
                onClick={handleSubmit}
              >
                Đăng nhập
              </Button>
            </Form>
            <div className="mt-3 " style={{fontSize:"12px"}}>
              <p className="textFromLogin m-0">Khách hàng mới? <b onClick={()=>{onclickRegister()}} className="text-decoration-none text-danger fw-light">Tạo tài khoản</b></p>
               <p className="textFromLogin m-0">Quên mật khẩu? <Link className="text-decoration-none text-danger">Khôi phục mật khẩu</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
