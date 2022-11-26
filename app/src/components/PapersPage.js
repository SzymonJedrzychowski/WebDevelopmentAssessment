import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import PapersAuthors from './PapersAuthors';
import PapersSearchForm from './PapersSearchForm';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import '../styles/PapersPage.css'

/**
 * PapersPage
 * 
 * function that creates page for general papers and all categories
 * 
 * @author Szymon Jedrzychowski
 */
function PapersPage(props) {
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [paperSearchTerm, setPaperSearchTerm] = useState("all");
    const [pageCount, setPageCount] = useState(0);
    var { track } = useParams();
    const trackNames = {
        "papers": "All Papers",
        "interactivity": "Interactivity",
        "wip": "Work-In-Progress",
        "fullpapers": "Full Papers",
        "competition": "Student Game Design Competition",
        "doctoral": "Doctoral Consortium",
        "rapid": "Rapid Communications"
    }

    if (track === undefined) {
        track = "papers";
    }

    useEffect(() => {
        document.getElementById("search").value = "";
        document.getElementById("awardValue").value = "all"
        setPageCount(0);
    }, [track])

    const setPaperLimit = (event) => {
        setPageCount(0);
        setLimit(event.target.value)
    }
    const setPage = (event) => {
        setPageCount(event.target.value)
    };
    const search = (value) => (
        (value.title.toLowerCase().includes(searchTerm.toLowerCase())
            || value.abstract.toLowerCase().includes(searchTerm.toLowerCase()))
        && (paperSearchTerm === "all" || paperSearchTerm === value.award)
        && (value.short_name.toLowerCase() === track.toLowerCase() || track.toLowerCase() === "papers"));
    const updateSearchTerm = function (targetId, targetValue) {
        if (targetId === "search") {
            setSearchTerm(targetValue);
        } else {
            setPaperSearchTerm(targetValue);
        }
    }
    let papersToShow = props.data.papers.filter(search);
    const pageButtons = (currentPage, setPage, papersToShow, limit) => {
        currentPage = parseInt(currentPage);
        let l = Math.ceil(papersToShow.length / limit);
        return (
            <>
                {(currentPage>0) && <Button onClick={setPage} value={0}>{"<<"}</Button>}
                {(currentPage<=0) && <Button disabled>{"<<"}</Button>}
                {(currentPage + 1 >= l && currentPage-2 >= 0) && <Button onClick={setPage} value={currentPage - 2}>{currentPage - 1}</Button>}
                {currentPage - 1 >= 0 && <Button onClick={setPage} value={currentPage - 1}>{currentPage}</Button>}
                {(currentPage - 1 < 0 && currentPage + 2 >= l) && <Button disabled>-</Button>}
                <Button className="thisPage">{currentPage + 1}</Button>
                {(currentPage + 1 >= l && currentPage-2 < 0) && <Button disabled>-</Button>}
                {currentPage + 1 < l && <Button onClick={setPage} value={currentPage + 1}>{currentPage + 2}</Button>}
                {(currentPage - 1 < 0 && currentPage + 2 < l) && <Button onClick={setPage} value={currentPage + 2}>{currentPage + 3}</Button>}
                {(currentPage<l-1) && <Button onClick={setPage} value={l - 1}>{">>"}</Button>}
                {(currentPage>=l-1) && <Button disabled>{">>"}</Button>}
            </>
        );
    }
    const listOfPapers = <ListGroup>
        {papersToShow.slice(limit * pageCount, limit * (parseInt(pageCount) + 1)).map(
            (value) => <div key={value.paper_id} className="paper"><PapersAuthors data={value} /></div>
        )}
        {(!props.data.loadingPapers) &&
            <ListGroup.Item className="navi">
                <Form.Group className="itemsPP">
                    <Form.Label>Items per page: </Form.Label>
                    <Form.Select aria-label="Default select example" onChange={setPaperLimit}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="buttons">
                    {pageButtons(pageCount, setPage, papersToShow, limit)}
                </Form.Group>
            </ListGroup.Item>}
    </ListGroup>

    return (
        <div className="papersGroup">
            <h1>{trackNames[track.toLowerCase()]}</h1>
            <PapersSearchForm handler={updateSearchTerm} searchTerm={setSearchTerm} paperSearchTerm={setPaperSearchTerm} />
            {props.data.loadingPapers && <p>Loading...</p>}
            {listOfPapers}
        </div>
    );
}

export default PapersPage;