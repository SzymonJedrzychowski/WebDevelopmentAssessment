import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

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

    const listOfPapers = <ul>
        {papers.slice(0, limit).map(
            (value, key) => <li key={key}><h4>{value.title}</h4><div>{value.abstract}</div></li>
        )}
    </ul>

    const showMore = () => {
        setLimit(limit + 10);
    }

    return (
        <div>
            <h1>{track}</h1>
            <p>Welcome to the {track}!</p>
            {loading && <p>Loading...</p>}
            {listOfPapers}
            {!loading && <button onClick={showMore}>Show More</button>}
        </div>
    );
}

export default PapersPage;