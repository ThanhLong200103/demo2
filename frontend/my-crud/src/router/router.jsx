import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import EditPage from "../pages/EditPage";
import IndexPagew from "../pages/IndexPagew";
import DeletePage from "../pages/DeletePage";
import CartPage from "../pages/CartPage";

export default function AppRouter() {
    return(
        <Routes>
            <Route path="/" element = {<HomePage></HomePage>}></Route>
            <Route path="/create" element = {<CreatePage></CreatePage>}></Route>
            <Route path="/edit/:id" element = {<EditPage></EditPage>}></Route>
            <Route path="/index" element = {<IndexPagew></IndexPagew>}></Route>
            <Route path="/delete/:id" element = {<DeletePage></DeletePage>}></Route>
            <Route path="/cart" element = {<CartPage></CartPage>}></Route>


        </Routes>
    )
};
