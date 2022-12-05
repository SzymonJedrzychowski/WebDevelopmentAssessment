import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';

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
                    <LinkContainer to="/app">
                        <Navbar.Brand>Home</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Papers" id="basic-nav-dropdown">
                                <LinkContainer to="/app/papers">
                                    <NavDropdown.Item>All Papers</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/app/papers/interactivity">
                                    <NavDropdown.Item>Interactivity</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/app/papers/fullpapers">
                                    <NavDropdown.Item>Full papers</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/app/papers/wip">
                                    <NavDropdown.Item>Work-In-Progress</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/app/papers/competition">
                                    <NavDropdown.Item>Student Game Design Competition</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/app/papers/doctoral">
                                    <NavDropdown.Item>Doctoral Consortium</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/app/papers/rapid">
                                    <NavDropdown.Item>Rapid Communications</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                            <LinkContainer to="/app/authors"><Nav.Link>Authors</Nav.Link></LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Menu;