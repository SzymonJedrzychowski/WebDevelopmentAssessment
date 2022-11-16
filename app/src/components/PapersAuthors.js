import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

function PapersAuthors(props) {
    const [authors, setAuthors] = useState([]);
 
    useEffect( () => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/authors?affiliation&paper_id="+props.paper_id)
        .then( 
            (response) => response.json()
        )
        .then( 
            (json) => {
                setAuthors(json);
            } 
        )
        .catch((err) => {
            console.log(err.message);
        });
    }, [props.paper_id]);
    
    const listOfAuthors = 
        authors.map(
            (value, key) => <p key={key}><Link to={"/authors/"+value.author_id}>{value.first_name} {value.middle_initial} {value.last_name}</Link> {value.country} {value.state} {value.city} {value.institution} {value.department}</p>
        );
 
    return (
        <div>
           <p>Authors:</p>
           {listOfAuthors}
        </div>
    )
}
 
export default PapersAuthors;