import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';

function AuthorsPage(props) {
    const [limit, setLimit] = useState(10);
    const [searchTerm, setTerm] = useState("");

    const showMore = () => setLimit(limit + 10);
    const search = (value) => (value.first_name + " " + value.middle_name + " " + value.last_name).toLowerCase().includes(searchTerm.toLowerCase());
    const updateSearchTerm = function (event) {
        setTerm(document.getElementById("search").value);
        event.preventDefault();
    }
    let authorsToShow = props.data.authors.filter(search);

    const listOfAuthors = <ul>
        {authorsToShow.slice(0, limit).map(
            (value, key) => <li key={value.author_id}><Link to={"/authors/" + value.author_id}>{value.first_name} {value.middle_name} {value.last_name}</Link></li>
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
            <h1>Authors</h1>
            {props.data.loadingAuthors && <p>Loading...</p>}
            {listOfAuthors}
            {!props.data.loadingAuthors && <button onClick={showMore}>Show More</button>}
        </div>
    );
}

export default AuthorsPage;