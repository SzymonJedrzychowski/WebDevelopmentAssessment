import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';

// Import modules
import PapersAuthors from './PapersAuthors';
import PapersSearchForm from './PapersSearchForm';
import DataNavigation from './DataNavigation'

// Import styling
import '../styles/PapersPage.css'

/**
 * PapersPage displays the data of all papers.
 * 
 * Built upon the workshops material by:
 * @author John Rooksby
 * Modified by:
 * @author Szymon Jedrzychowski
 */
function PapersPage(props) {
    // pageLimit is variable that is used to determine number of entries on one page
    const [pageLimit, setPageLimit] = useState(10);

    const [searchTerm, setSearchTerm] = useState('');
    const [rewardStatusSearch, setRewardStatusSearch] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);

    // Use params to get which track of papers should be displayed
    var { track } = useParams();
    const trackNames = {
        "papers": "All Papers",
        "interactivity": "Interactivity",
        "wip": "Work-In-Progress",
        "fullpapers": "Full Papers",
        "competition": "Student Game Design Competition",
        "doctoral": "Doctoral Consortium",
        "rapid": "Rapid Communications"
    }

    // track will be undefined in case all papers need to be displayed
    if (track === undefined) {
        track = "papers";
    }

    // Reset the form values and corresponding states on entering new page (of different track)
    useEffect(() => {
        document.getElementById("searchTerm").value = "";
        document.getElementById("awardValue").value = "all"
        setCurrentPage(0);
    }, [track])

    // Handler for changing number of entries on page
    const setPageLimitHandler = (event) => {
        setCurrentPage(0);
        setPageLimit(event.target.value);
    }

    // Handler for changing current page
    const setCurrentPageHandler = (event) => {
        setCurrentPage(event.target.value)
    };

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
        && (rewardStatusSearch === "all" || rewardStatusSearch === value.award)
        && (value.short_name.toLowerCase() === track.toLowerCase() || track.toLowerCase() === "papers"));

    // Use the filter to get papers that should be shown
    let papersToShow = props.data.papers.filter(searchPapers);

    // Create JSX variable for showing papers
    const listOfPapers = <ListGroup>
        {papersToShow.slice(pageLimit * currentPage, pageLimit * (parseInt(currentPage) + 1)).map(
            (value) => <div key={value.paper_id} className="paper"><PapersAuthors data={value} /></div>
        )}

        {papersToShow.length === 0 && <div key="noData"><ListGroup.Item><h2>No data found</h2></ListGroup.Item></div>}

        {(!props.data.loadingPapers) &&
            <ListGroup.Item className="dataNavigation">
                {<DataNavigation currentPage={currentPage} setCurrentPage={setCurrentPageHandler} dataToShow={papersToShow} pageLimit={pageLimit} setPageLimit={setPageLimitHandler} />}
            </ListGroup.Item>
        }
    </ListGroup>

    return (
        <div className="papersGroup">
            <h1>{trackNames[track.toLowerCase()]}</h1>
            <PapersSearchForm handler={updateSearchTerm} setSearchTerm={setSearchTerm} setRewardStatusSearch={setRewardStatusSearch} />
            {props.data.loadingPapers && <p>Loading...</p>}
            {listOfPapers}
        </div>
    );
}

export default PapersPage;