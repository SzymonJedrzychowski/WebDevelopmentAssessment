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

    useEffect( () => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/papers?track=competition")
        .then( 
            (response) => response.json() 
        )
        .then( 
            (json) => setPapers(json)
        )
        .catch((err) => {
            console.log(err.message);
        });
      }, []);

    const listOfPapers = <ul>
        { papers.map(
            (value, key) => <li key={key}>{value.title}</li>
        )}
    </ul>


    return (
        <div>
            <h1>competition</h1>
            <p>Welcome to the competition!</p>
            {listOfPapers}
        </div>
    );
}

export default CompetitionPage;