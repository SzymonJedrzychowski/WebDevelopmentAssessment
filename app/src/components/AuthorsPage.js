import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';

// Import modules
import DataNavigation from './DataNavigation';

// Import styling
import '../styles/AuthorsPage.css';


/**
 * AuthorsPage displays the data (first and last name) of all authors
 * and allows to click on any author to go to their page.
 * 
 * Built upon the workshops material by:
 * @author John Rooksby
 * Modified by:
 * @author Szymon Jedrzychowski
 */
function AuthorsPage(props) {
    // pageLimit is variable that is used to determine number of entries on one page
    const [pageLimit, setPageLimit] = useState(10);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    // Handler for updating search term
    const updateSearchTerm = function (event) {
        setCurrentPage(0);
        setSearchTerm(event.target.value);
    }

    // Function to reset the search term
    const resetSearch = () => {
        setSearchTerm('');
        document.getElementById("searchTerm").value = "";
    }

    // Handler for changing number of entries on page
    const setPageLimitHandler = (event) => {
        setCurrentPage(0);
        setPageLimit(event.target.value);
    }

    // Handler for changing current page
    const setCurrentPageHandler = (event) => {
        setCurrentPage(event.target.value)
    };

    // Prevent submission of form (on pressing enter)
    const preventSubmission = (event) => event.preventDefault()

    // Filter for searching actors (by first or last name)
    const searchAuthors = (value) =>
        (value.first_name + " " + value.middle_initial + " " + value.last_name).toLowerCase().includes(searchTerm.toLowerCase());

    // Use the filter to get actors that should be shown
    let authorsToShow = props.data.authors.filter(searchAuthors);

    // Create JSX variable for showing authors
    const listOfAuthors = <ListGroup>
        {authorsToShow.slice(pageLimit * currentPage, pageLimit * (parseInt(currentPage) + 1)).map(
            (value) => <div className="author" key={value.author_id}>
                <ListGroup.Item as={Link} to={"/authors/" + value.author_id} action>
                    <h2>{value.first_name} {value.middle_initial} {value.last_name}</h2>
                </ListGroup.Item>
            </div>
        )}

        {authorsToShow.length === 0 && <div key="noData"><ListGroup.Item><h2>No data found</h2></ListGroup.Item></div>}

        {(!props.data.loadingActors) &&
            <ListGroup.Item className="dataNavigation">
                {<DataNavigation currentPage={currentPage} setCurrentPage={setCurrentPageHandler} dataToShow={authorsToShow} pageLimit={pageLimit} setPageLimit={setPageLimitHandler} />}
            </ListGroup.Item>
        }
    </ListGroup>

    return (
        <div className='authorsGroup'>
            <h1>Authors</h1>
            <Form onSubmit={preventSubmission} onChange={updateSearchTerm} className="d-flex">
                <Form.Control
                    id="searchTerm"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button onClick={resetSearch}>Reset</Button>
            </Form>
            {props.data.loadingAuthors && <p>Loading...</p>}
            {listOfAuthors}
        </div>
    );
}

export default AuthorsPage;