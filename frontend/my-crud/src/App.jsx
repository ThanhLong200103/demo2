import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent"
import AppRouter from "./router/router"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBarComponent from "./components/SideBarComponent";
import { useSelector } from "react-redux";
import CartComponent from "./components/CartComponent";
import SearchComponent from "./components/searchComponent";
import DetailComponent from "./components/detailComponent";
import './i18n/i18n';
import AddressUserComponent from "./components/AddressUserComponent";
function App() {


  const { showSideBar } = useSelector((state) => state.sideBar);
  const { showCart } = useSelector((state) => state.cart);
  const { showSearch } = useSelector((state) => state.search);
  const { showDetail ,productId } = useSelector((state) => state.detail);
  const {showAddress} = useSelector((state) => state.address)

  return (
    <>
    <HeaderComponent ></HeaderComponent>
    <AppRouter></AppRouter>
    <ToastContainer />
    <FooterComponent></FooterComponent>
    <SideBarComponent isOpen={showSideBar} />
    <CartComponent open = {showCart}/>
    <SearchComponent OpenS={ showSearch}></SearchComponent>
    <DetailComponent showDetail={showDetail} productId={productId} ></DetailComponent>
    <AddressUserComponent showAddress={showAddress}></AddressUserComponent>
    </>
  )
}

export default App
