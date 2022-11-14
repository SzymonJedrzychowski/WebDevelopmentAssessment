import React, { useState, useEffect } from 'react';

/**
 * InteractivityPage
 * 
 * function that creates page for general papers and all categories
 * 
 * @author Szymon Jedrzychowski
 */
function InteractivityPage() {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/papers?track=Interactivity")
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
            (value, key) => <li key={key}>{value.title}</li>
        )}
    </ul>

    const showMore = () => {
        setLimit(limit + 10);
    }

    return (
        <div>
            <h1>Interactivity</h1>
            <p>Welcome to the Interactivity!</p>
            {loading && <p>Loading...</p>}
            {listOfPapers}
            {!loading && <button onClick={showMore}>Show More</button>}
        </div>
    );
}

export default InteractivityPage;