import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';

function AuthorsPage() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setTerm] = useState("");

    useEffect(() => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/authors")
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setLoading(false);
                    setAuthors(json);
                }
            )
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const showMore = () => setLimit(limit + 10);
    const search = (value) => (value.first_name + " " + value.middle_name + " " + value.last_name).toLowerCase().includes(searchTerm.toLowerCase());
    const updateSearchTerm = function (event) {
        setTerm(document.getElementById("search").value);
        event.preventDefault();
    }
    let authorsToShow = authors.filter(search);

    const listOfAuthors = <ul>
        {authorsToShow.slice(0, limit).map(
            (value, key) => <li key={key}><Link to={"/authors/" + value.author_id}>{value.first_name} {value.middle_name} {value.last_name}</Link></li>
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
            {loading && <p>Loading...</p>}
            {listOfAuthors}
            {!loading && <button onClick={showMore}>Show More</button>}
        </div>
    );
}

export default AuthorsPage;