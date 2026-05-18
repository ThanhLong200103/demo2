import { useState } from "react";
import LoginComponent from "../components/Login";
import { RepositoryFactory } from "../service/FactoryService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/auth";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async ()=>{
        // console.log("Email:",email ,"Pass :",password)

       try {
         const data = await RepositoryFactory.get('auth').login({email,password})
        //  console.log(data.accessToken)
         dispatch(loginSuccess({ token: data.accessToken }));

         navigate("/")
       } catch (error) {
        console.log(error)
       }

     
    }
  return (
    <LoginComponent
    valueEmail={email} valuePassword={password} setValueEmail={setEmail} setValuePassword={setPassword} handleLogin={handleLogin}
    ></LoginComponent>
  );
}