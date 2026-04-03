import { useEffect, useState } from "react";
import axiosClient from "../api/axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeletePage from "./DeletePage";
import { MdAddShoppingCart } from "react-icons/md";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get("/products");
        setProducts(res); 
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/product/delete/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Add to cart
  const handleCreateCart = async (product_id, quantity) => {
    try {
      await axiosClient.post("/cartitem/create", {
        product_id,
        quantity,
      });
      alert("Added to cart!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Handle</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>

     
              <td>
                <img src={p.img} alt={p.name} width="60" />
              </td>

              <td>{p.quantity}</td>

              <td>
                <Button
                  as={Link}
                  to={`/edit/${p.id}`}
                  variant="success"
                  size="sm"
                  className="me-2"
                >
                  Edit
                </Button>

                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setShow(true);
                    setId(p.id);
                  }}
                >
                  Delete
                </Button>

                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => {}}
                >
                  <MdAddShoppingCart />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <DeletePage
        show={show}
        handleClose={() => setShow(false)}
        userId={id}
        onDelete={handleDelete}
      />
    </>
  );
}