import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import PapersAuthors from './PapersAuthors';

/**
 * PapersPage
 * 
 * function that creates page for general papers and all categories
 * 
 * @author Szymon Jedrzychowski
 */
function PapersPage(preps) {
    const [limit, setLimit] = useState(10);
    const [searchTerm, setTerm] = useState("");
    const [paperSearch, setPaperSearch] = useState("all");
    var { track } = useParams();

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
        && (paperSearch === "all" || paperSearch === value.award) && (value.short_name.toLowerCase() === track.toLowerCase() || track.toLowerCase() === "papers")
    );
    const updateSearchTerm = function (event) {
        setTerm(document.getElementById("search").value);
        if (document.getElementById("awardValue").value === "false") {
            setPaperSearch(null);
        } else {
            setPaperSearch(document.getElementById("awardValue").value);
        }
        event.preventDefault();
    }
    let papersToShow = preps.data.papers.filter(search);

    const listOfPapers = <ul>
        {papersToShow.slice(0, limit).map(
            (value, key) => <li key={value.paper_id}><PapersAuthors data={value} /></li>
        )}
    </ul>

    return (
        <div>
            <Form onSubmit={updateSearchTerm} className="d-flex">
                <Form.Control
                    id="search"
                    onChange={updateSearchTerm}
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Form.Select id="awardValue" aria-label="Default select example" onChange={updateSearchTerm}>
                    <option value="all">All papers</option>
                    <option value="true">Only rewarded papers</option>
                    <option value="false">Only non-rewarded papers</option>
                </Form.Select>
            </Form>
            <h1>{track}</h1>
            <p>Welcome to the {track}!</p>
            {preps.data.loadingPapers && <p>Loading...</p>}
            {listOfPapers}
            {!preps.data.loadingPapers && <button onClick={showMore}>Show More</button>}
        </div>
    );
}

export default PapersPage;