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
        <Navbar collapseOnSelect bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/assessment/app/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Papers" id="basic-nav-dropdown">
                            <LinkContainer to="/papers">
                                <NavDropdown.Item>All Papers</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/papers/interactivity">
                                <NavDropdown.Item>Interactivity</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/papers/fullpapers">
                                <NavDropdown.Item>Full papers</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/papers/wip">
                                <NavDropdown.Item>Work-In-Progress</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/papers/competition">
                                <NavDropdown.Item>Student Game Design Competition</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/papers/doctoral">
                                <NavDropdown.Item>Doctoral Consortium</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/papers/rapid">
                                <NavDropdown.Item>Rapid Communications</NavDropdown.Item>
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