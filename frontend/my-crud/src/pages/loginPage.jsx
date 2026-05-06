import { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/authAccess";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../services/FactoryService";
import axiosClient from "../api/axios";
import "../styles/inputAccount.css"
export default function LoginPage({setAccount , showDetail,productId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword ,setShowForgotPassword] = useState(false)
  const dispatch = useDispatch();
  const navigation = useNavigate();

  
  const mergePendingCart = async (accessToken) => {
    try {
      if(accessToken){
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
    } catch (err) {
      console.error("Lỗi khi merge pendingCart:", err);
    }
  };

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

      
      await mergePendingCart(data.accessToken);

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
      {
        showForgotPassword ?  <Container className="d-flex justify-content-center mb-5 formAccount">
       <Col md={8}>
        <Form>
          <Form.Group>
             <Form.Control
                type="text"
                placeholder="Vui lòng nhập email của bạn"
                value={email}
                className="inputAccount"
                onChange={(e) => setEmail(e.target.value)}
              />
          </Form.Group>
           <div >
              
						This site is protected by reCAPTCHA and the Google 
						<a href="https://policies.google.com/privacy" className="text-decoration-none"> Privacy Policy </a> 
						and 
            <a href="https://policies.google.com/terms" className="text-decoration-none"> Terms of Service </a> apply.
					
            </div>
             <div className="d-flex gap-4  mt-4 flex-wrap " style={{maxWidth :"990px"}}>
             <Button className="h-75 px-4 text-white border-0"  type="submit" style={{cursor:"pointer" , background:"#d2d2d2"}}>
              GỬI EMAIL
            </Button>
             <div>
              <p className="m-0">Quay lại  </p>
              <b onClick={()=>{setShowForgotPassword(false)}} className="text-primary">đăng nhập </b>
              
             
          
             </div>
          </div>

        </Form>
       </Col>
      </Container> :
      <Container className="d-flex justify-content-center mb-5 formAccount">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Vui lòng nhập email của bạn"
                value={email}
                className="inputAccount"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
             
              <Form.Control
                type="password"
                placeholder="Vui lòng nhập mật khẩu"
                value={password}
                 className="inputAccount"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div >
              
						This site is protected by reCAPTCHA and the Google 
						<a href="https://policies.google.com/privacy" className="text-decoration-none"> Privacy Policy </a> 
						and 
            <a href="https://policies.google.com/terms" className="text-decoration-none"> Terms of Service </a> apply.
					
            </div>

           <div className="d-flex gap-4  mt-4 flex-wrap " style={{maxWidth :"990px"}}>
             <Button className="h-75 px-4 text-danger border-0"  type="submit" style={{cursor:"pointer" , background:"#d2d2d2"}}>
              Đăng nhập
            </Button>
             <div>
              <p className="m-0">Bạn chưa có tài khoản?
              <b onClick={()=>{setAccount(true)}} className="text-primary">Đăng ký tài khoản</b>
              </p>
              <p>
                Bạn quên mật khẩu?
                 <b onClick={()=>{setShowForgotPassword(true)}} className="text-primary">Quên mật khẩu?</b>
              </p>
          
             </div>
          </div>
          </Form>
         
        </Col>
      </Container>
      }
      
    </>
  );
}
