import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// Import modules
import PapersSearchForm from './PapersSearchForm';
import GenerateTable from "./GenerateTable";
import { generalHandleCurrentPage, generalHandlePageLimit } from "./Functions";

// Import styling
import "../styles/TablePage.css";

/**
 * AuthorPage is responsible for displaying page for specific author and their papers.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
function AuthorPage() {
    // States used for data loading.
    const [papers, setPapers] = useState([]);
    const [author, setAuthor] = useState([]);
    const [papersLoading, setLoadingPapers] = useState(true);
    const [authorLoading, setLoadingAuthor] = useState(true);

    // States used for page navigation.
    const [pageLimit, setPageLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    // States used for search functionality.
    const [searchTerm, setSearchTerm] = useState("");
    const [rewardStatusSearch, setRewardStatusSearch] = useState('all');

    // error state is used to determine if data was loaded correctly.
    const [error, setError] = useState(false);

    // Use params to get id of the current author.
    const { authorId } = useParams();

    // Get data of specific author.
    useEffect(() => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/authors?author_id=" + authorId)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setLoadingAuthor(false);
                    setAuthor(json.data[0]);
                }
            )
            .catch((err) => {
                console.log(err.message);
                setError(true);
            });
    }, [authorId]);

    // Get data of papers of specific author.
    useEffect(() => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/papers?author_id=" + authorId)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setLoadingPapers(false);
                    setPapers(json.data);
                }
            )
            .catch((err) => {
                console.log(err.message);
                setError(true);
            });
    }, [authorId]);

    // Reset the form values and corresponding states on entering new page (of different author).
    useEffect(() => {
        document.getElementById("searchTerm").value = "";
        document.getElementById("awardValue").value = "all";
    }, [authorId])

    // Handler for changing number of entries on page.
    const handlePageLimit = (event) => generalHandlePageLimit(event, setCurrentPage, setPageLimit);

    // Handler for changing current page.
    const handleCurrentPage = (event) => generalHandleCurrentPage(event, setCurrentPage);

    // If error occurred while loading data, display error message
    if (error) {
        return <div>
            Results couldn't be found.
        </div>
    }

    // Filter used for papers.
    const searchPapers = (value) => (
        (value.title.toLowerCase().includes(searchTerm.toLowerCase())
            || value.abstract.toLowerCase().includes(searchTerm.toLowerCase()))
        && (rewardStatusSearch === "all" || rewardStatusSearch === value.award));

    // Use the filter to get papers that should be shown.
    let papersToShow = papers.filter(searchPapers);

    return (
        <div className="pageContent">
            <h1>{author.first_name} {author.middle_initial} {author.last_name}</h1>

            <PapersSearchForm setCurrentPage={setCurrentPage}
                setSearchTerm={setSearchTerm}
                setRewardStatusSearch={setRewardStatusSearch}
                placeholder="Search for title or abstract" />

            <GenerateTable dataToShow={papersToShow}
                loadingData={(papersLoading && authorLoading)}
                currentPage={currentPage}
                handleCurrentPage={handleCurrentPage}
                pageLimit={pageLimit}
                handlePageLimit={handlePageLimit}
                type={"papers"}
            />
        </div>
    );
}

export default AuthorPage;