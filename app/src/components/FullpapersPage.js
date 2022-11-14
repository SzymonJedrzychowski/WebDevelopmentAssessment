import React, { useState, useEffect } from 'react';

/**
 * FullpapersPage
 * 
 * function that creates page for general papers and all categories
 * 
 * @author Szymon Jedrzychowski
 */
function FullpapersPage() {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/papers?track=fullpapers")
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
            <h1>fullpapers</h1>
            <p>Welcome to the fullpapers!</p>
            {loading && <p>Loading...</p>}
            {listOfPapers}
            {!loading && <button onClick={showMore}>Show More</button>}
        </div>
    );
}

export default FullpapersPage;