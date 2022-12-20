import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useLocation} from "react-router-dom"

// Import modules
import PapersSearchForm from './PapersSearchForm';
import GenerateTable from "./GenerateTable";

// Import styling
import "../styles/TablePage.css";

/**
 * PapersPage displays the data of all papers.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
function PapersPage(props) {
    // pageLimit is variable that is used to determine number of entries on one page
    const [pageLimit, setPageLimit] = useState(10);

    const [searchTerm, setSearchTerm] = useState('');
    const [rewardStatusSearch, setRewardStatusSearch] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);

    // Using useLocation hook to get the data from home page recommendations.
    const recommendation = useLocation();

    // Use params to get which track of papers should be displayed
    let {track} = useParams();
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

    useEffect(() => {
        if(recommendation.state){
            document.getElementById("searchTerm").value = recommendation.state.title;
            setSearchTerm(recommendation.state.title);
        }
    }, [recommendation.state])
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

    return (
        <div className="pageContent">
            <h1>{trackNames[track.toLowerCase()]}</h1>

            <PapersSearchForm handler={updateSearchTerm}
                              setSearchTerm={setSearchTerm}
                              setRewardStatusSearch={setRewardStatusSearch}
                              placeholder="Search paper by title or abstract"/>

            <GenerateTable dataToShow={papersToShow}
                           setCurrentPageHandler={setCurrentPageHandler}
                           setPageLimitHandler={setPageLimitHandler}
                           currentPage={currentPage}
                           pageLimit={pageLimit}
                           loadingData={props.data.loadingPapers}
                           type={"papers"}
            />
        </div>
    );
}

export default PapersPage;