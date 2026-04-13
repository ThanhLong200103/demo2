import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axios";
import { AiOutlineLogout } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authAccess";
import { RepositoryFactory } from "../services/FactoryService";

export default function HeaderComponent(params) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [userId, setId] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token) {
      const checkMe = async () => {
        try {
          const user = await RepositoryFactory.get("user").profile();
          console.log(user.id);
          setId(user.id);
          setProfile(user);
        } catch (error) {
          console.log("Token expired, attempting refresh...");
        }
      };
      checkMe();
    }
  }, [token]);

  const handleLogOut = async () => {
    try {
      const logOut = await RepositoryFactory.get("user").logout();
      toast.success("Đã đăng xuất");
      localStorage.removeItem("accessToken");
      dispatch(logout());
      navigate("/login");
      setId(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              Create
            </Nav.Link>
           {profile ? <Nav.Link as={Link} to="/index" state={profile}>
              Profile
            </Nav.Link> 
             : " "
           }
           {profile ? <Nav.Link as={Link} to="/history">
              Giao dịch
            </Nav.Link> 
             : " "
           }
          </Nav>
          <Form
            className="d-flex justify-content-end "
            style={{ marginRight: "10px" }}
          >
            <Button variant="outline-success" as={Link} to={`/cart`}>
              {" "}
              <FaShoppingCart />{" "}
            </Button>
          </Form>

          {userId ? (
            <Form className="d-flex justify-content-end">
              <Button
                variant="outline-success"
                onClick={() => {
                  handleLogOut();
                }}
              >
                {" "}
                <AiOutlineLogout />{" "}
              </Button>
            </Form>
          ) : (
            <Form className="d-flex justify-content-end">
              <Button variant="outline-success" as={Link} to={`/login`}>
                Đăng Nhập
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
