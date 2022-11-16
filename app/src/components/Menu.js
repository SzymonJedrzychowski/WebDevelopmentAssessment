import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';

/**
 * Main menu
 * 
 * Navigation for the website and all pages
 * 
 * @author Szymon Jedrzychowski
 */
function Menu() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/assessment/app/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/papers"><Nav.Link>Papers</Nav.Link></LinkContainer>
                        <NavDropdown title="Papers categories" id="basic-nav-dropdown">
                            <LinkContainer to="/papers/interactivity">
                                <NavDropdown.Item>interactivity</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/papers/fullpapers">
                                <NavDropdown.Item>fullpapers</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/papers/wip">
                                <NavDropdown.Item>wip</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/papers/competition">
                                <NavDropdown.Item>competition</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/papers/doctoral">
                                <NavDropdown.Item>doctoral</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/papers/rapid">
                                <NavDropdown.Item>rapid</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        <LinkContainer to="/authors"><Nav.Link>Authors</Nav.Link></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;