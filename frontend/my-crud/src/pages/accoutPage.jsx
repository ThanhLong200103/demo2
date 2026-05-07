import { useEffect, useState } from "react"
import { Button, Container, Row } from "react-bootstrap"
import "../styles/maxWidth.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import LoginPage from "./loginPage"
import RegisterPage from "./registerPage"
import { useTranslation } from "react-i18next"
export default function AccountPage() {
    const[account , setAccount] = useState(true)
    const localtion = useLocation()
    const{showDetail , productId} = localtion.state ||{}
    // console.log(localtion)
    const { t } = useTranslation("auth");

    return(
        <>
        <Container >
            <div className="d-flex justify-content-center" style={{padding:"60px 0 0"}}>
            <h4 className="pe-3 fw-bold"><Button className="border-0 bg-white fs-4 fw-bold" onClick={()=>{setAccount(false)}}><p className={account ? "text-secondary":"text-black"}>{t("auth.login")}</p></Button></h4>
                <span className="fw-bold fs-4 pt-1">|</span>
            <h4 className="ps-3 fw-bold"><Button className="border-0 bg-white  fs-4 fw-bold" onClick={()=>{setAccount(true)}}><p className={account ?"text-black":"text-secondary"}>{t("auth.register")}</p></Button></h4>
          </div> 
         {account ? <RegisterPage setAccount={setAccount} showDetail={showDetail} productId = {productId}   ></RegisterPage>: <LoginPage setAccount={setAccount}></LoginPage>}
        </Container>
        </>
    )
};
