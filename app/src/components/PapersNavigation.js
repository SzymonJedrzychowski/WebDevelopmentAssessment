import Nav from 'react-bootstrap/Nav';
import { Outlet } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

function PapersNavigation() {
    return (
        <div>
            <Nav justify>
                <Nav.Item>
                    <LinkContainer to="interactivity"><Nav.Link>interactivity</Nav.Link></LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="fullpapers"><Nav.Link>fullpapers</Nav.Link></LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="wip"><Nav.Link>wip</Nav.Link></LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="competition"><Nav.Link>competition</Nav.Link></LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="doctoral"><Nav.Link>doctoral</Nav.Link></LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="rapid"><Nav.Link>rapid</Nav.Link></LinkContainer>
                </Nav.Item>
            </Nav>
            <Outlet />
        </div>
    );
}

export default PapersNavigation;