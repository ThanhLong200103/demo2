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
export default function SearchComponent({ OpenS }) {
  const d = useDispatch();
  return (
    <>
    <div
        className={`search-overlay ${OpenS ? "active" : ""} `}
        onClick={()=>{}}
      ></div>
      <Container fluid className={`search ${OpenS ? "active" : ""}`}>
        <Container className="d-flex justify-content-between " style={{minHeight:"200px"}}>
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
                  className="mt-3 " style={{  marginRight: "300px",borderRadius:"0"}}
                  
                >
                 
                </FormControl>
                   <Button className="position-absolute bs-2 border-0 border-bottom border-end border-top text-black bg-white" style={{right:"0" ,top:"0" ,borderRadius:"0"}}>
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
      </Container>
    </>
  );
}
