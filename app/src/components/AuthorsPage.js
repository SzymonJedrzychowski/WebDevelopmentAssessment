import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

// Import modules
import GenerateTable from "./GenerateTable";

// Import styling
import "../styles/TablePage.css";

/**
 * AuthorsPage displays the data (first and last name) of all authors
 * and allows to click on any author to go to their page.
 *
 * @author John Rooksby
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

    return (
        <div className='pageContent'>
            <h1>Authors</h1>

            <Form onSubmit={preventSubmission} onChange={updateSearchTerm} className="d-flex">
                <Form.Control
                    id="searchTerm"
                    placeholder="Search author name"
                    className="me-2"
                    aria-label="Search"
                />
                <Button onClick={resetSearch}>Reset</Button>
            </Form>

            <GenerateTable dataToShow={authorsToShow}
                           loadingData={props.data.loadingAuthors}
                           currentPage={currentPage}
                           setCurrentPageHandler={setCurrentPageHandler}
                           pageLimit={pageLimit}
                           setPageLimitHandler = {setPageLimitHandler}
                           type={"author"}
            />
        </div>
    );
}

export default AuthorsPage;