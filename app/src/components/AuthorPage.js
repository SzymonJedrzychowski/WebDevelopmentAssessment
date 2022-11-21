import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import PapersAuthors from './PapersAuthors';

function AuthorPage() {
    const [papers, setPapers] = useState([]);
    const [author, setAuthor] = useState([]);
    const [papersLoading, setLoadingPapers] = useState(true);
    const [authorLoading, setLoadingAuthor] = useState(true);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setTerm] = useState("");
    const [paperSearch, setPaperSearch] = useState("all");
    var { author_id } = useParams();

    useEffect(() => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/authors?author_id=" + author_id)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setLoadingAuthor(false);
                    setAuthor(json[0]);
                }
            )
            .catch((err) => {
                console.log(err.message);
                setError(true);
            });
    }, [author_id]);

    useEffect(() => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/papers?author_id=" + author_id)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setLoadingPapers(false);
                    setPapers(json);
                }
            )
            .catch((err) => {
                console.log(err.message);
                setError(true);
            });
    }, [author_id]);

    useEffect(() => {
        document.getElementById("search").value = "";
        document.getElementById("awardValue").value = "all";
    }, [author_id])

    if (error) {
        return <div>
            Result couldn't be found.
        </div>
    }

    const showMore = () => setLimit(limit + 10);
    const search = (value) => ((value.title.toLowerCase().includes(searchTerm.toLowerCase()) || value.abstract.toLowerCase().includes(searchTerm.toLowerCase())) && (paperSearch === "all" || paperSearch === value.award));
    const updateSearchTerm = function (event) {
        setTerm(document.getElementById("search").value);
        if (document.getElementById("awardValue").value === "false") {
            setPaperSearch(null);
        } else {
            setPaperSearch(document.getElementById("awardValue").value);
        }
        event.preventDefault();
    }
    let papersToShow = papers.filter(search);

    const listOfPapers = <ul>
        {papersToShow.slice(0, limit).map(
            (value, key) => <li key={key}><h4>{value.title}</h4><div><p>{value.abstract}</p><PapersAuthors paper_id={value.paper_id} /></div></li>
        )}
    </ul>

    return (
        <div>
            <h1>{author.first_name} {author.middle_initial} {author.last_name}</h1>
            <Form onSubmit={updateSearchTerm} className="d-flex">
                <Form.Control
                    id="search"
                    onChange={updateSearchTerm}
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Form.Select id="awardValue" aria-label="Default select example" onChange={updateSearchTerm}>
                    <option value="all">All papers</option>
                    <option value="true">Only rewarded papers</option>
                    <option value="false">Only non-rewarded papers</option>
                </Form.Select>
            </Form>
            {(papersLoading && authorLoading) && <p>Loading...</p>}
            {listOfPapers}
            {(!papersLoading && authorLoading) && <button onClick={showMore}>Show More</button>}
        </div>
    );
}

export default AuthorPage;