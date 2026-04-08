import HeaderComponent from "./components/HeaderComponent"
import AppRouter from "./router/router"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {


  return (
    <>
    <HeaderComponent ></HeaderComponent>
    <AppRouter></AppRouter>
    <ToastContainer />
    </>
  )
}

export default App
