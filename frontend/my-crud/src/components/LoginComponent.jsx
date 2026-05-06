import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../services/FactoryService";
import { loginSuccess, logout } from "../redux/features/authAccess";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import "../styles/form.css";
import { RiShutDownLine } from "react-icons/ri";
export default function LoginComponent({setShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword ,setShowForgotPassword] = useState(false)
  const {isAuthenticated} = useSelector((state)=>state.auth)
  // console.log("auth: ",isAuthenticated)
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
      // setShow(false);
      setShowLogin(false);
      setEmail("");
      setPassword(""); 
      if(data.accessToken){
        if(localStorage.getItem("pendingCart")){
          const pendingCart = JSON.parse(localStorage.getItem("pendingCart"));
          const reponse = await RepositoryFactory.get("cart").getCart();
          for (const item of pendingCart) {
            console.log("item: ", item , reponse.id);
            const cartItem = await RepositoryFactory.get("cart").createCartItem(
              {
                productId: item.productId,
                quantity: item.quantity,
                attributesId: item.attributesId,
                cartId: reponse.id
              }
            )
            console.log(cartItem)
          }
          localStorage.removeItem("pendingCart");
        }
      }
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
      } 
    }
  };

  const onclickRegister=()=>{
    setShowLogin(false)
    n("/account")
  }
  const handleLogout = async()=>{
    try {
      await RepositoryFactory.get("user").logout()
      dispatch(logout())
      localStorage.removeItem("accessToken")
      toast.success("Đã đăng xuất")
    } catch (error) {
      toast.warning("Hãy thử lại sau")
    }
  } 
  const handleProfile = async ()=>{
    const profile = await RepositoryFactory.get("user").profile()
    n("/index",{
      state:{name :profile.name , email :profile.email ,phone :profile.phone}
    })
  }
  return (
    <>
     
      <div onClick={(e) => e.stopPropagation()} className="" >
       
      {
        isAuthenticated ? <div className="login-modal  text-center rounded shadow  p-0">
         <div className="d-flex gap-0 ">
           <p className="pt-2 w-50" onClick={()=>{ handleProfile()          
          }}>
           profile
          </p>
          <p className="pt-2 w-50 border-start" onClick={()=>{handleLogout ()}}>
           <RiShutDownLine />
          </p  >
         </div>
          <p className="border-top pt-3" onClick={()=>{n("/history")}} >Giao dịch</p>
          </div>
          
          :
        showForgotPassword ?
        <div className="login-modal  text-center rounded shadow ">
          <div>
            <div>
            <p className="mb-2 tileLogin">Khôi phục mật khẩu</p>
            <p style={{ fontSize: "14px" }}>Nhập email của bạn</p>
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
                Khôi phục mật khẩu
              </Button>
            </Form>
             <div className="mt-3 " style={{fontSize:"12px"}}>
               <p className="textFromLogin m-0">Bạn đã nhớ mật khẩu?  <b onClick={()=>{setShowForgotPassword(false)}} className="text-decoration-none text-danger fw-light">Trở về đăng nhập</b></p>
            </div>
          </div>
          </div>
        </div>
         :
        <div className="login-modal   text-center rounded shadow ">
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
                  type="password"
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
               <p className="textFromLogin m-0">Quên mật khẩu?  <b onClick={()=>{setShowForgotPassword(true)}} className="text-decoration-none text-danger fw-light">Quên mật khẩu?</b></p>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
    </>
  );
}
