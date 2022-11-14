import React, { useState, useEffect } from 'react';

/**
 * CompetitionPage
 * 
 * function that creates page for general papers and all categories
 * 
 * @author Szymon Jedrzychowski
 */
function CompetitionPage() {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/papers?track=competition")
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
    }, []);

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
            <h1>competition</h1>
            <p>Welcome to the competition!</p>
            {loading && <p>Loading...</p>}
            {listOfPapers}
            {!loading && <button onClick={showMore}>Show More</button>}
        </div>
    );
}

export default CompetitionPage;