import React, { useState, useEffect } from 'react';

/**
 * DoctoralPage
 * 
 * function that creates page for general papers and all categories
 * 
 * @author Szymon Jedrzychowski
 */
function DoctoralPage() {
    const [papers, setPapers] = useState([]);

    useEffect( () => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/papers?track=doctoral")
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
            <h1>doctoral</h1>
            <p>Welcome to the doctoral!</p>
            {listOfPapers}
        </div>
    );
}

export default DoctoralPage;