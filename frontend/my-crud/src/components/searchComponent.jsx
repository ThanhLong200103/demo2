import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import "../styles/search.css";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { closeSearch } from "../redux/features/search";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { RepositoryFactory } from "../services/FactoryService";
export default function SearchComponent({ OpenS }) {
  const d = useDispatch();
  const[name ,setName] = useState(null)
  const [product , setProduct] = useState([])
   useEffect(
          ()=>{
              const getProduct = async ()=>{
                  const data = await RepositoryFactory.get("product").searchProduct(name)
                  console.log(data);
                  setProduct(data)
              }
              getProduct()
          },[name]
      )
  return (
    <>
    <div
        className={`search-overlay ${OpenS ? "active" : ""} `}
        onClick={()=>{}}
      ></div>
      <Container fluid className={`search ${OpenS ? "active" : ""}`} style={{minHeight:"200px"}} >
        <Container className="d-flex justify-content-between " >
          <Row>
            <Col>
              <Button className="bg-white border-0 w-100  " as={Link} to={`/`}>
                <img
                  src="//theme.hstatic.net/200000690725/1001078549/14/logo.png?v=1069"
                  alt="ToranoSearch"
                  className="img-fluid "
                  style={{ maxHeight: "70px" }}
                />
              </Button>
            </Col>
          </Row>
          <Row>
            <Form>
              <FormGroup className="position-relative">
                <FormControl
                  type="text"
                  placeholder="Tìm kiếm sản phẩm ..."
                  name="search"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3 " style={{  marginRight: "300px",borderRadius:"0"}}
                  
                >
                 
                </FormControl>
                   <Button className="position-absolute bs-2 border-0 border-bottom border-end border-top text-black bg-white" style={{right:"0" ,top:"0" ,borderRadius:"0"}} as={Link} to={`/search/${name}`}>
                    <CiSearch/>
                </Button>
              </FormGroup>
            </Form>
          </Row>
          <Row>
            <Button
              className="bg-white border-0 text-black fs-2 h-25"
              onClick={() => {
                d(closeSearch(false));
              }}
            >
              <IoCloseOutline />
            </Button>
          </Row>
        </Container>
        <Container className="h-25">
          <Row>
            
            {
              product.length>0 ? <Col>
              <ul>
              {
              product.map((p)=>(
              <li className="d-flex">
             <p>{ p.name}</p>
             <p><img src={p.img} alt=""  className="w-25 "/></p>
              </li>
              ))
              }
              </ul>
              </Col>: <Col>
              <p>Không tìm thấy sản phẩm </p>
              </Col>

            }
            
          </Row>
        </Container>
      </Container>
    </>
  );
}
