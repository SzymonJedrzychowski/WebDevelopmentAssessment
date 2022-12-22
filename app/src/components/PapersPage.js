import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useLocation} from "react-router-dom"

// Import modules
import PapersSearchForm from './PapersSearchForm';
import GenerateTable from "./GenerateTable";
import {generalHandleCurrentPage, generalHandlePageLimit, generalHandleSearchTerm} from "./Functions";

// Import styling
import "../styles/TablePage.css";

/**
 * PapersPage displays the data of all papers.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
function PapersPage(props) {
    // States used for page navigation.
    const [pageLimit, setPageLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    // States used for search functionality.
    const [searchTerm, setSearchTerm] = useState('');
    const [rewardStatusSearch, setRewardStatusSearch] = useState('all');

    // Using useLocation hook to get the data from home page recommendations.
    const recommendation = useLocation();

    // Using params to get which track of papers should be displayed.
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

    // If track is undefined, all papers should be displayed.
    if (track === undefined) {
        track = "papers";
    }

    // Reset the form values and corresponding states on entering new page (of different track).
    useEffect(() => {
        document.getElementById("searchTerm").value = "";
        document.getElementById("awardValue").value = "all"
        setSearchTerm("");
        setRewardStatusSearch("all");
        setCurrentPage(0);
    }, [track])

    // Set the search term if page was accessed from recommendation.
    useEffect(() => {
        if (recommendation.state) {
            document.getElementById("searchTerm").value = recommendation.state.title;
            setSearchTerm(recommendation.state.title);
        }
    }, [recommendation.state])

    // Handler for changing number of entries on page.
    const handlePageLimit = (event) => generalHandlePageLimit(event, setCurrentPage, setPageLimit);

    // Handler for changing current page.
    const handleCurrentPage = (event) => generalHandleCurrentPage(event, setCurrentPage);

    // Filter used for papers.
    const searchPapers = (value) => (
        (value.title.toLowerCase().includes(searchTerm.toLowerCase())
            || value.abstract.toLowerCase().includes(searchTerm.toLowerCase()))
        && (rewardStatusSearch === "all" || rewardStatusSearch === value.award)
        && (value.short_name.toLowerCase() === track.toLowerCase() || track.toLowerCase() === "papers"));

    // Use the filter to get papers that should be shown.
    let papersToShow = props.data.papers.filter(searchPapers);

    return (
        <div className="pageContent">
            <h1>{trackNames[track.toLowerCase()]}</h1>

            <PapersSearchForm
                setCurrentPage={setCurrentPage}
                setSearchTerm={setSearchTerm}
                setRewardStatusSearch={setRewardStatusSearch}
                placeholder="Search paper by title or abstract"/>

            <GenerateTable
                dataToShow={papersToShow}
                loadingData={props.data.loadingPapers}
                currentPage={currentPage}
                handleCurrentPage={handleCurrentPage}
                pageLimit={pageLimit}
                handlePageLimit={handlePageLimit}
                type={"papers"}
            />
        </div>
    );
}

export default PapersPage;