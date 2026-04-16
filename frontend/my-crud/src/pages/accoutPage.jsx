import { useEffect, useState } from "react"
import { Button, Container, Row } from "react-bootstrap"
import "../styles/maxWidth.css"
import { Link, useNavigate } from "react-router-dom"
import LoginPage from "./loginPage"
import RegisterPage from "./registerPage"
export default function AccountPage() {
    const[account , setAccount] = useState(true)

    return(
        <>
        <Container >
            <div className="d-flex justify-content-center" style={{padding:"60px 0 0"}}>
            <h4 className="pe-3 fw-bold"><Button className="border-0 bg-white fs-4 fw-bold" onClick={()=>{setAccount(false)}}><p className={account ? "text-secondary":"text-black"}>Đăng nhập</p></Button></h4>
                <span className="fw-bold fs-4 pt-1">|</span>
            <h4 className="ps-3 fw-bold"><Button className="border-0 bg-white  fs-4 fw-bold" onClick={()=>{setAccount(true)}}><p className={account ?"text-black":"text-secondary"}>Đăng ký</p></Button></h4>
          </div> 
         {account ? <RegisterPage setAccount={setAccount}></RegisterPage>: <LoginPage setAccount={setAccount}></LoginPage>}
        </Container>
        </>
    )
};
