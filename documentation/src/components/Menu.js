import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

/**
 * Navigation for the pages of the documentation.
 * 
 * @author Szymon Jedrzychowski
 */
function Menu() {
    return (
        <header>
            <Navbar collapseOnSelect bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Documentation</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/base">Base</Nav.Link>
                            <Nav.Link as={Link} to="/papers">Papers</Nav.Link>
                            <Nav.Link as={Link} to="/authors">Authors</Nav.Link>
                            <Nav.Link as={Link} to="/authenticate">Authenticate</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Menu;