import { useEffect, useState } from "react";
import axiosClient from "../api/axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeletePage from "./DeletePage";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../services/FactoryService";
import ProductComponent from "../components/ProductComponent";
import { Container } from "react-bootstrap";
import CarouselComponent from "../components/CarouselComponent";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const quantity = 1
  // const tinh = 0-1 ;
  // console.log(tinh)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await RepositoryFactory.get("product").getAll();
        setProducts(res); 
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };
    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/product/delete/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };


  const handleCreateCart = async (productId, quantity) => {
     
    try {
       const response = await axiosClient.get("/cart");

        const cartId = response.id;
        console.log(cartId ,productId ,quantity)
    await axiosClient.post("/cartitem/create", {
        productId,
        quantity,
        cartId,
      });
    
    
      alert("Added to cart!");
      setProducts(products.map((p) => p.id === productId ? { ...p, quantity: p.quantity - quantity } : p));
    } catch (err) {
      toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng");
    }
  };

  return (
      <>
      <Container style={{maxWidth :"1600px"}} className="position-relative">
        {/* <CarouselComponent></CarouselComponent> */}
        <ProductComponent products = {products}></ProductComponent>
      </Container>
      </>
  );
}