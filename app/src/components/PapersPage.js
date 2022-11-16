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
function PapersPage() {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setTerm] = useState("");
    var { track } = useParams();

    var fetchLink = "http://unn-w20020581.newnumyspace.co.uk/assessment/api/papers";
    if (track === undefined) {
        track = "papers";
    } else if (["interactivity", "fullpapers", "wip", "competition", "doctoral", "rapid"].includes(track)) {
        if (track === "interactivity") {
            fetchLink += "?track=Interactivity";
        } else {
            fetchLink += "?track=" + track;
        }
    }

    useEffect(() => {
        fetch(fetchLink)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setLoading(false);
                    setPapers(json);
                }
            )
            .catch((err) => {
                console.log(err.message);
            });
    }, [fetchLink]);

    useEffect(() => {
        setTerm("");
        document.getElementById("search").value = "";
    }, [fetchLink])

    const showMore = () => setLimit(limit + 10);
    const search = (value) => value.title.includes(searchTerm) || value.abstract.includes(searchTerm);
    const updateSearchTerm = function(event){
        setTerm(document.getElementById("search").value);
        event.preventDefault();
    }
    let papersToShow = papers.filter(search);

    const listOfPapers = <ul>
        {papersToShow.slice(0, limit).map(
            (value, key) => <li key={key}><h4>{value.title}</h4><div><p>{value.abstract}</p><PapersAuthors paper_id={value.paper_id}/></div></li>
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
            </Form>
            <h1>{track}</h1>
            <p>Welcome to the {track}!</p>
            {loading && <p>Loading...</p>}
            {listOfPapers}
            {!loading && <button onClick={showMore}>Show More</button>}
        </div>
    );
}

export default PapersPage;