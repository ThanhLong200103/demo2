import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import axiosClient from "../api/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { RepositoryFactory } from "../services/FactoryService";
import "../styles/inputAccount.css";
import { useTranslation } from 'react-i18next';
export default function RegisterPage({ setAccount }) {
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const register = await RepositoryFactory.get("user").register(data);
      toast.success("Tạo tài khoản thành công");
      navigate("/login");
    } catch (error) {
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
        if (validationErrors?.name) {
          toast.error(validationErrors.name);
        }
        if (validationErrors?.phone) {
          toast.error(validationErrors.phone);
        }
        if (
          !validationErrors?.email &&
          !validationErrors?.password &&
          !validationErrors?.name &&
          !validationErrors?.phone
        ) {
          toast.error(apiData?.message || "Đã có lỗi xảy ra");
        }
      } else {
        toast.error(apiData?.message || "Đã có lỗi xảy ra");
      }
    }
  };
  return (
    <>
      <Container className="d-flex justify-content-center mb-5">
        <Col md={8}>
          <Form onSubmit={handleRegister} className="mb-3 formAccount">
            <Form.Group className="mb-3 " controlId="formGroupName">
              <Form.Control
                type="text"
                placeholder={t("auth.lastName")}
                value={data.name}
                name="name"
                className="inputAccount"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formGroupName">
              <Form.Control
                type="text"
                placeholder={t("auth.firstName")}
                value={data.phone}
                name="phone"
                className="inputAccount"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex gap-4" controlId="formGroupGender">
                <Form.Check
                  type="radio"
                  label={t("auth.female")}
                  name="Gender"
                  id="radio-1"
                />
                <Form.Check
                  type="radio"
                  label={t("auth.male")}
                  name="Gender"
                  id="radio-2"
                />
              </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              

              <Form.Control
                type="text"
                placeholder="mm/dd/yyyy"
                name="ngaySinh"
                value={data.date}
                onChange={handleChange}
                className="inputAccount"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="inputAccount"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Control
                type="text"
                placeholder={t("auth.password")}
                name="password"
                value={data.password}
                onChange={handleChange}
                className="inputAccount"
              />
            </Form.Group>
            <div >
              
						This site is protected by reCAPTCHA and the Google 
						<a href="https://policies.google.com/privacy" className="text-decoration-none"> Privacy Policy </a> 
						and 
            <a href="https://policies.google.com/terms" className="text-decoration-none"> Terms of Service </a> apply.
					
            </div>

            <div className="mt-3 d-flex gap-4">
            <Button className="h-75 px-4 text-danger border-0"  type="submit" style={{cursor:"pointer" , background:"#d2d2d2"}}>
              {t("auth.register")}
            </Button>
             <div>
              <p className="mb-0">{t("auth.haveAccount")}</p>
              <b className="text-primary mt-0" onClick={()=>{setAccount(false)}}>{t("auth.loginNow")}</b>
          
             </div>
            </div>
          </Form>
         
        </Col>
      </Container>
    </>
  );
}
