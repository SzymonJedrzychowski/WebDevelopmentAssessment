import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';

function PapersAuthors(props) {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    const fetchAuthors = () => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/authors?affiliation&paper_id=" + props.data.paper_id)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setAuthors(json.data);
                    setLoading(false)
                }
            )
            .catch((err) => {
                console.log(err.message);
            });
    }

    const showDetails = () => {
        fetchAuthors();
        setVisible(!visible);
    }

    const listOfAuthors =
        authors.map(
            (value) => <p key={value.author_id}><Link to={"/authors/" + value.author_id}>{value.first_name} {value.middle_initial} {value.last_name}</Link> {value.country} {value.state} {value.city} {value.institution} {value.department}</p>
        );

    return (
        <ListGroup.Item action onClick={showDetails}>
            <h2>{props.data.title}</h2>
            {visible && <div>
                <p>{props.data.abstract}</p>
                <p>Authors:</p>
                {listOfAuthors}
                {loading && <p>Loading...</p>}
            </div>}
        </ListGroup.Item>
    )
}

export default PapersAuthors;