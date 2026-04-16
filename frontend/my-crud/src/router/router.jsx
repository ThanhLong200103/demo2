import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import EditPage from "../pages/EditPage";
import IndexPagew from "../pages/IndexPagew";
import DeletePage from "../pages/DeletePage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/loginPage";
import OrderPage from "../pages/orderPage";
import RegisterPage from "../pages/registerPage";
import PurchaseHistoryPage from "../pages/purchaseHistoryPage";
import VnpayPage from "../pages/VnpayPage";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFail from "../pages/PaymentFail";
import AccountPage from "../pages/accoutPage";

export default function AppRouter() {
    return(
        <Routes>
            <Route path="/" element = {<HomePage></HomePage>}></Route>
            <Route path="/create" element = {<CreatePage></CreatePage>}></Route>
            <Route path="/edit/:id" element = {<EditPage></EditPage>}></Route>
            <Route path="/index" element = {<IndexPagew></IndexPagew>}></Route>
            <Route path="/delete/:id" element = {<DeletePage></DeletePage>}></Route>
            <Route path="/cart" element = {<CartPage></CartPage>}></Route>
            <Route path="/login" element = {<LoginPage></LoginPage>}></Route>
            <Route path="/order" element = {<OrderPage></OrderPage>}></Route>
            <Route path="/register" element = {<RegisterPage></RegisterPage>}></Route>
            <Route path="/history" element = {<PurchaseHistoryPage></PurchaseHistoryPage>}></Route>
            <Route path="/payment" element = {<VnpayPage></VnpayPage>}></Route>
            <Route path="/payment-success" element = {<PaymentSuccess></PaymentSuccess>}></Route>
            <Route path="/payment-failed" element = {<PaymentFail></PaymentFail>}></Route>
            <Route path="/account" element = {<AccountPage></AccountPage>}></Route>
        </Routes>
    )
};
