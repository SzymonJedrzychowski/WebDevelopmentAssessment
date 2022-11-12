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
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/assessment/app/papers/interactivity">interactivity</NavDropdown.Item>
                            <NavDropdown.Item href="/assessment/app/papers/fullpapers">fullpapers</NavDropdown.Item>
                            <NavDropdown.Item href="/assessment/app/papers/wip">wip</NavDropdown.Item>
                            <NavDropdown.Item href="/assessment/app/papers/competition">competition</NavDropdown.Item>
                            <NavDropdown.Item href="/assessment/app/papers/doctoral">doctoral</NavDropdown.Item>
                            <NavDropdown.Item href="/assessment/app/papers/rapid">rapid</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;