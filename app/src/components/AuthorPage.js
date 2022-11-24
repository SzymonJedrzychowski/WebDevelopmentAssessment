import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import PapersAuthors from './PapersAuthors';
import PapersSearchForm from './PapersSearchForm';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/AuthorPage.css'

function AuthorPage(props) {
    const [papers, setPapers] = useState([]);
    const [author, setAuthor] = useState([]);
    const [papersLoading, setLoadingPapers] = useState(true);
    const [authorLoading, setLoadingAuthor] = useState(true);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [paperSearchTerm, setPaperSearchTerm] = useState("all");
    var { author_id } = useParams();

    useEffect(() => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/authors?author_id=" + author_id)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setLoadingAuthor(false);
                    setAuthor(json.data[0]);
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
                    setPapers(json.data);
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
            Results couldn't be found.
        </div>
    }

    const showMore = () => setLimit(limit + 10);
    const search = (value) => (
        (value.title.toLowerCase().includes(searchTerm.toLowerCase())
            || value.abstract.toLowerCase().includes(searchTerm.toLowerCase()))
        && (paperSearchTerm === "all" || paperSearchTerm === value.award));
    const updateSearchTerm = function (targetId, targetValue) {
        if (targetId === "search") {
            setSearchTerm(targetValue);
        } else {
            setPaperSearchTerm(targetValue);
        }
    }
    let papersToShow = papers.filter(search);

    const listOfPapers = <ListGroup>
        {papersToShow.slice(0, limit).map(
            (value) => <div key={value.paper_id} className="paper"><PapersAuthors data={value} /></div>
        )}
        {((!papersLoading && !authorLoading) && limit<papersToShow.length) && <ListGroup.Item action onClick={showMore} className="showMore">Show More</ListGroup.Item>}
    </ListGroup>

    return (
        <div className="papersGroup">
            <h1>{author.first_name} {author.middle_initial} {author.last_name}</h1>
            <PapersSearchForm handler={updateSearchTerm} searchTerm={setSearchTerm} paperSearchTerm={setPaperSearchTerm} />
            {(papersLoading && authorLoading) && <p>Loading...</p>}
            {listOfPapers}
        </div>
    );
}

export default AuthorPage;