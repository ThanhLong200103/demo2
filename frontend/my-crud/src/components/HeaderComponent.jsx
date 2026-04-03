import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function HeaderComponent(params) {
    return(
         <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as = {Link} to ='/'>Home</Nav.Link>
            <Nav.Link as = {Link} to ='/create'>Create</Nav.Link>
            <Nav.Link as = {Link} to ='/index'>Index</Nav.Link>
            
          </Nav>
          <Form className="d-flex">
            
            <Button variant="outline-success"  as={Link}  to={'/cart'}> <FaShoppingCart/> </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
};
