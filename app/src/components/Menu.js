import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

/**
 * Menu is responsible for displaying navigation for the website.
 * 
 * @author Szymon Jedrzychowski
 */
function Menu() {
    return (
        <header>
            <Navbar collapseOnSelect bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Papers" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/papers">All Papers</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/papers/interactivity">Interactivity</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/papers/fullpapers">Full papers</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/papers/wip">Work-In-Progress</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/papers/competition">Student Game Design Competition</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/papers/doctoral">Doctoral Consortium</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/papers/rapid">Rapid Communications</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/authors">Authors</Nav.Link>
                            <Nav.Link as={Link} to="/admin">Admin page</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Menu;