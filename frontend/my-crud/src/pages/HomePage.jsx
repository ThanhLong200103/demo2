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
import { Container, Row } from "react-bootstrap";
import CarouselComponent from "../components/CarouselComponent";
import { useSelector } from "react-redux";
export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [cursor, setCursor] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;
  const i18nextlng = localStorage.getItem("i18nextLng")
 const { currentLanguage } = useSelector((state) => state.language);

  const totalPages = Math.ceil(total / limit);
  const quantity = 1;

  // const tinh = 0-1 ;
  // console.log(tinh)

   const fetchProducts = async (page = 1) => {
      try {
        const res = await RepositoryFactory.get("product").getAll({
          limit: limit,
          cursor: null,
          page: page,
        });
        setProducts(res[0]);
        setCursor({
          next: res[1],
          prev: res[2],
        });

        setTotal(res[3]["COUNT(*)"]);
        console.log("res :", res);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };
  useEffect(() => {
   
    fetchProducts(currentPage);
     console.log("language:", currentLanguage);
  }, [currentPage , currentLanguage]);
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
      console.log(cartId, productId, quantity);
      await axiosClient.post("/cartitem/create", {
        productId,
        quantity,
        cartId,
      });

      alert("Added to cart!");
      setProducts(
        products.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - quantity } : p,
        ),
      );
    } catch (err) {
      toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng");
    }
  };
const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

const setPrevPage = async () => {
  try {
    const direction = "prev";
   const res = await RepositoryFactory.get("product").getAll({
          limit: limit,
          cursor: cursor.prev,
          direction: direction,
    
        });
        setProducts(res[0]);
        setCursor({
          next: res[1],
          prev: res[2],
        });
        setCurrentPage(currentPage - 1)
  } catch (error) {
    console.error("Error fetching previous page:", error);
  }
  
}
const setNextPage = async () => {
  try {
    const direction = "next";
   const res = await RepositoryFactory.get("product").getAll({
          limit: limit,
          cursor: cursor.next,
          direction: direction,
      


        });
        setProducts(res[0]);
        setCursor({
          next: res[1],
          prev: res[2],
        });
        setCurrentPage(currentPage + 1)
  } catch (error) {
    console.error("Error fetching next page:", error);
  }
  
}
  return (
    <>
      <Container style={{ maxWidth: "1600px" }} className="position-relative">
        {/* <CarouselComponent></CarouselComponent> */}
        <ProductComponent
          products={products}
          cursor={cursor}
        ></ProductComponent>
      </Container>
      <Container className="mb-5">
        <Row className="d-flex justify-content-center gap-2 mt-4">

  {/* Prev */}
  {currentPage > 1 && (
    <Button
      onClick={() => setPrevPage()}
      className="rounded-circle border-0 text-dark  "
      style={{ width: 40, height: 40 ,background :"#f5f5f5"  }}
    >
      &lt;
    </Button>
  )}

  {/* Page numbers */}
  {pages.map((page) => (
    <Button
      key={page}
      onClick={() => setCurrentPage(page)
      
      }
      className={`rounded-circle border-0 text-black  ${
        currentPage === page ? "bg-dark text-white" : ""
      }`}
      style={{ width: 40, height: 40, background: "#eee" }}
    >
      {page}
    </Button>
  ))}

  {/* Next */}
  {currentPage < totalPages && (
    <Button
      onClick={() => setNextPage()

        
      }
      className="rounded-circle border-0 text-black"
      style={{ width: 40, height: 40 ,background :"#f5f5f5" }}
    >
      &gt;
    </Button>
  )}

</Row>
      </Container>
    </>
  );
}
