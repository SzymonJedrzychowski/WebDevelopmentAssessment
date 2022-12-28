import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

// Import modules.
import TablePage from "./TablePage";
import { generalHandleCurrentPage, generalHandlePageLimit } from "./Functions";

// Import styling.
import "../styles/TablePage.css";

/**
 * AuthorsPage displays the data (first and last name) of all authors
 * and allows to click on any author to go to their page.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
function AuthorsPage(props) {
    // States used for page navigation.
    const [pageLimit, setPageLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    // States used for search functionality.
    const [searchTerm, setSearchTerm] = useState("");

    // Handler for updating search term.
    const updateSearchTerm = function (event) {
        setCurrentPage(0);
        setSearchTerm(event.target.value);
    }

    // Function to reset the search term.
    const resetSearch = () => {
        setSearchTerm('');
        document.getElementById("searchTerm").value = "";
    }

    // Handler for changing number of entries on page.
    const handlePageLimit = (event) => generalHandlePageLimit(event, setCurrentPage, setPageLimit);

    // Handler for changing current page.
    const handleCurrentPage = (event) => generalHandleCurrentPage(event, setCurrentPage);

    // Prevent submission of form (on pressing enter).
    const preventSubmission = (event) => event.preventDefault()

    // Filter for searching actors (by first or last name).
    const searchAuthors = (value) =>
        (value.first_name + " " + value.middle_initial + " " + value.last_name).toLowerCase().includes(searchTerm.toLowerCase());

    // Use the filter to get actors that should be shown.
    let authorsToShow = props.data.authors.filter(searchAuthors);

    return (
        <div className='pageContent'>
            <h1>Authors</h1>

            <Form onSubmit={preventSubmission} onChange={updateSearchTerm} className="searchForm">
                <Form.Control
                    id="searchTerm"
                    placeholder="Search author name"
                    className="me-2"
                    aria-label="Search"
                />
                <Button onClick={resetSearch}>Reset</Button>
            </Form>

            <TablePage
                dataToShow={authorsToShow}
                loadingData={props.data.loadingAuthors}
                currentPage={currentPage}
                handleCurrentPage={handleCurrentPage}
                pageLimit={pageLimit}
                handlePageLimit={handlePageLimit}
                type={"author"}
            />
        </div>
    );
}

export default AuthorsPage;