import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import StaffPage from "../pages/StaffPage";
import OrderPage from "../pages/OrderPage";
import ProductPage from "../pages/ProductPage";
import UserPage from "../pages/UserPage";
import SystemPage from "../pages/SystemPage";
import LoginPage from "../pages/LoginPage";


export const RouterApp = () => {
    
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/system" element={<SystemPage />} />
      
    </Routes>
  );
};

export const RouterLogin = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
       <Route
    path="*"
    element={
      <Navigate to="/login" />
    }
  />

    </Routes>
  );
};
