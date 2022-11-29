import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';

// Import modules
import PapersAuthors from './PapersAuthors';
import PapersSearchForm from './PapersSearchForm';
import DataNavigation from './DataNavigation';

// Import styling
import '../styles/AuthorPage.css'

/**
 * AuthorPage component
 *
 * AuthorPage is responsible for displaying page for specific author and their papers.
 * 
 * @author Szymon Jedrzychowski
 */
function AuthorPage() {
    const [papers, setPapers] = useState([]);
    const [author, setAuthor] = useState([]);
    const [papersLoading, setLoadingPapers] = useState(true);
    const [authorLoading, setLoadingAuthor] = useState(true);

    // error is variable that is used to determine if data was loaded correctly
    const [error, setError] = useState(false);

    // pageLimit is variable that is used to determine number of entries on one page
    const [pageLimit, setPageLimit] = useState(10);

    const [searchTerm, setSearchTerm] = useState("");
    const [rewardStatusSearch, setRewardStatusSearch] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);

    // Use params to get id of the current author
    var { author_id } = useParams();

    // Get data of authors in specific paper by API fetch
    useEffect(() => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/authors?author_id=" + author_id)
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
    }, [author_id]);

    // Get data of papers of specific author by API fetch
    useEffect(() => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/papers?author_id=" + author_id)
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
    }, [author_id]);

    // Reset the form values and corresponding states on entering new page (of different author)
    useEffect(() => {
        document.getElementById("searchTerm").value = "";
        document.getElementById("awardValue").value = "all";
    }, [author_id])

    // Handler for changing number of entries on page
    const setPageLimitHandler = (event) => {
        setCurrentPage(0);
        setPageLimit(event.target.value);
    }

    // Handler for changing current page
    const setCurrentPageHandler = (event) => {
        setCurrentPage(event.target.value)
    };  

    // If error occured while loading data, display error message
    if (error) {
        return <div>
            Results couldn't be found.
        </div>
    }

    // Handler for updating search term
    const updateSearchTerm = function (targetId, targetValue) {
        // Reset page to index 0 on searching
        setCurrentPage(0);

        // Update correct value, depending on which variable has changed
        if (targetId === "searchTerm") {
            setSearchTerm(targetValue);
        } else {
            setRewardStatusSearch(targetValue);
        }
    }

    // Filter for papers
    const searchPapers = (value) => (
        (value.title.toLowerCase().includes(searchTerm.toLowerCase())
            || value.abstract.toLowerCase().includes(searchTerm.toLowerCase()))
        && (rewardStatusSearch === "all" || rewardStatusSearch === value.award));

    // Use the filter to get papers that should be shown
    let papersToShow = papers.filter(searchPapers);

    // Create JSX variable for showing papers
    const listOfPapers = <ListGroup>
        {papersToShow.slice(pageLimit * currentPage, pageLimit * (parseInt(currentPage) + 1)).map(
            (value) => <div key={value.paper_id} className="paper"><PapersAuthors data={value} /></div>
        )}

        {papersToShow.length === 0 &&
            <div key="noData"><ListGroup.Item><h2>No data found</h2></ListGroup.Item></div>
        }

        {(!papersLoading && !authorLoading) &&
            <ListGroup.Item className="dataNavigation">
                {<DataNavigation currentPage={currentPage} setCurrentPage={setCurrentPageHandler} dataToShow={papersToShow} pageLimit={pageLimit} setPageLimit={setPageLimitHandler} />}
            </ListGroup.Item>
        }
    </ListGroup>

    return (
        <div className="papersGroup">
            <h1>{author.first_name} {author.middle_initial} {author.last_name}</h1>
            <PapersSearchForm handler={updateSearchTerm} setSearchTerm={setSearchTerm} setRewardStatusSearch={setRewardStatusSearch} />
            {(papersLoading && authorLoading) && <p>Loading...</p>}
            {listOfPapers}
        </div>
    );
}

export default AuthorPage;