import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import PapersAuthors from './PapersAuthors';
import PapersSearchForm from './PapersSearchForm';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/PapersPage.css'

/**
 * PapersPage
 * 
 * function that creates page for general papers and all categories
 * 
 * @author Szymon Jedrzychowski
 */
function PapersPage(props) {
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
    let papersToShow = props.data.papers.filter(search);

    const listOfPapers = <ListGroup>
        {papersToShow.slice(0, limit).map(
            (value) => <div key={value.paper_id} className="paper"><PapersAuthors data={value} /></div>
        )}
        {(!props.data.loadingPapers && limit<papersToShow.length) && <ListGroup.Item action onClick={showMore} className="showMore">Show More</ListGroup.Item>}
    </ListGroup>

    return (
        <div className="papersGroup">
            <h1>{trackNames[track.toLowerCase()]}</h1>
            <PapersSearchForm handler={updateSearchTerm} searchTerm={setSearchTerm} paperSearchTerm={setPaperSearchTerm} />
            {props.data.loadingPapers && <p>Loading...</p>}
            {listOfPapers}
        </div>
    );
}

export default PapersPage;