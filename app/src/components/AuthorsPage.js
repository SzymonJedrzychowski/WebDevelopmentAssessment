import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import '../styles/AuthorsPage.css';

function AuthorsPage(props) {
    const [limit, setLimit] = useState(10);
    const [searchTerm, setTerm] = useState("");

    const showMore = () => setLimit(limit + 10);
    const search = (value) => (value.first_name + " " + value.middle_initial + " " + value.last_name).toLowerCase().includes(searchTerm.toLowerCase());
    const updateSearchTerm = function (event) {
        setTerm(event.target.value);
    }
    const preventSubmission = (event) => event.preventDefault();
    let authorsToShow = props.data.authors.filter(search);
    const resetSearch = (event) => {
        setTerm("")
        document.getElementById("search").value = "";
    }

    const listOfAuthors = <ListGroup>
        {authorsToShow.slice(0, limit).map(
            (value) => <div className="author" key={value.author_id}><Link to={"/authors/" + value.author_id}><ListGroup.Item action>{value.first_name} {value.middle_initial} {value.last_name}</ListGroup.Item></Link></div>
        )}
        {(!props.data.loadingAuthors && limit<authorsToShow.length) && <ListGroup.Item action onClick={showMore} className="showMore">Show More</ListGroup.Item>}
    </ListGroup>

    return (
        <div className='authorsGroup'>
            <h1>Authors</h1>
            <Form onSubmit={preventSubmission} className="d-flex">
                <Form.Control
                    id="search"
                    onChange={updateSearchTerm}
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button onClick={resetSearch}>Reset</Button>
            </Form>
            {props.data.loadingAuthors && <p>Loading...</p>}
            {listOfAuthors}
        </div>
    );
}

export default AuthorsPage;