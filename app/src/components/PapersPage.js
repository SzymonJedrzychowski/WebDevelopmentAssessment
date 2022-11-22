import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import PapersAuthors from './PapersAuthors';
import PapersSearchForm from './PapersSearchForm';

/**
 * PapersPage
 * 
 * function that creates page for general papers and all categories
 * 
 * @author Szymon Jedrzychowski
 */
function PapersPage(preps) {
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [paperSearchTerm, setPaperSearchTerm] = useState("all");
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

    if (track === undefined) {
        track = "papers";
    }

    useEffect(() => {
        document.getElementById("search").value = "";
        document.getElementById("awardValue").value = "all"
    }, [track])

    const showMore = () => setLimit(limit + 10);
    const search = (value) => (
        (value.title.toLowerCase().includes(searchTerm.toLowerCase())
            || value.abstract.toLowerCase().includes(searchTerm.toLowerCase()))
        && (paperSearchTerm === "all" || paperSearchTerm === value.award)
        && (value.short_name.toLowerCase() === track.toLowerCase() || track.toLowerCase() === "papers"));
    const updateSearchTerm = function (targetId, targetValue) {
        if (targetId === "search") {
            setSearchTerm(targetValue);
        } else {
            setPaperSearchTerm(targetValue);
        }
    }
    let papersToShow = preps.data.papers.filter(search);

    const listOfPapers = <ul>
        {papersToShow.slice(0, limit).map(
            (value, key) => <li key={value.paper_id}><PapersAuthors data={value} /></li>
        )}
    </ul>

    return (
        <div>
            <PapersSearchForm handler={updateSearchTerm} />
            <h1>{trackNames[track.toLowerCase()]}</h1>
            {preps.data.loadingPapers && <p>Loading...</p>}
            {listOfPapers}
            {!preps.data.loadingPapers && <button onClick={showMore}>Show More</button>}
        </div>
    );
}

export default PapersPage;