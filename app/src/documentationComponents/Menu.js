import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'

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
                    <LinkContainer to="/documentation">
                        <Navbar.Brand>Documentation</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/documentation/base"><Nav.Link>Base</Nav.Link></LinkContainer>
                            <LinkContainer to="/documentation/papers"><Nav.Link>Papers</Nav.Link></LinkContainer>
                            <LinkContainer to="/documentation/authors"><Nav.Link>Authors</Nav.Link></LinkContainer>
                            <LinkContainer to="/documentation/authenticate"><Nav.Link>Authenticate</Nav.Link></LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Menu;