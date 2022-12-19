import {Buffer} from 'buffer';
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from "react-bootstrap/ListGroup";

// Import modules
import UpdateAward from './UpdateAward';
import DataNavigation from "./DataNavigation";
import PapersSearchForm from "./PapersSearchForm";

// Import styling
import '../styles/AdminPage.css';

function AdminPage(props) {
    // pageLimit is variable that is used to determine number of entries on one page
    const [pageLimit, setPageLimit] = useState(10);

    const [searchTerm, setSearchTerm] = useState('');
    const [rewardStatusSearch, setRewardStatusSearch] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/verify",
                    {
                        method: 'POST',
                        headers: new Headers({"Authorization": "Bearer " + localStorage.getItem('token')})
                    })
                    .then(
                        (response) => {
                            return response.json()
                        })
                    .then(
                        (json) => {
                            if (json.message === "Success") {
                                props.data.handleAuthenticated(true);
                                setName(json.data[0].name);
                            } else {
                                localStorage.removeItem('token');
                            }
                        })
                    .catch(
                        (e) => {
                            console.log(e.message)
                        }
                    )
            }
        });

    const handleClick = () => {
        const encodedString = Buffer.from(username + ":" + password).toString('base64');

        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/authenticate",
            {
                method: 'POST',
                headers: new Headers({"Authorization": "Basic " + encodedString})
            })
            .then(
                (response) => {
                    return response.json()
                })
            .then(
                (json) => {
                    if (json.message === "Success") {
                        props.data.handleAuthenticated(true)
                        setName(json.data.name)
                        localStorage.setItem('token', json.data.token);
                    }
                })
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSignOut = () => {
        setName("");
        localStorage.removeItem('token');
        props.data.handleAuthenticated(false);
    }

    // Handler for changing number of entries on page
    const setPageLimitHandler = (event) => {
        setCurrentPage(0);
        setPageLimit(event.target.value);
    }

    // Handler for changing current page
    const setCurrentPageHandler = (event) => {
        setCurrentPage(event.target.value)
    };

    // Handler for updating search term
    const updateSearchTerm = function (targetId, targetValue) {
        // Reset page to index 0 on searching
        setCurrentPage(0);

        // Update correct value, depending on which variable has changed
        if (targetId === "searchTerm") {
            setSearchTerm(targetValue);
        } else {
            setRewardStatusSearch(targetValue);
        }
    }
    const searchPapers = (value) => (
        (value.title.toLowerCase().includes(searchTerm.toLowerCase())
            || value.abstract.toLowerCase().includes(searchTerm.toLowerCase()))
        && (rewardStatusSearch === "all" || rewardStatusSearch === value.award));

    // Use the filter to get papers that should be shown
    let papersToShow = props.data.papers.filter(searchPapers);

    const awardDictionary = {"true": "true", null: "false"};

    // Create JSX variable for showing papers
    const listOfPapers = <ListGroup>
        {papersToShow.slice(pageLimit * currentPage, pageLimit * (parseInt(currentPage) + 1)).map(
            (value) => <div key={value.paper_id} className="paper">
                <UpdateAward paper={value}
                             awardDictionary={awardDictionary}
                             handleUpdate={props.data.handleUpdate}
                             handleSignOut={handleSignOut}/>
            </div>
        )}

        {papersToShow.length === 0 && <div key="noData"><ListGroup.Item><h2>No data found</h2></ListGroup.Item></div>}

        {(!props.data.loadingPapers) &&
            <ListGroup.Item className="dataNavigation">
                {<DataNavigation currentPage={currentPage} setCurrentPage={setCurrentPageHandler} dataToShow={papersToShow} pageLimit={pageLimit} setPageLimit={setPageLimitHandler} />}
            </ListGroup.Item>
        }
    </ListGroup>

    return (
        <div className="papersGroup">
            <h1>Admin Page</h1>
            {props.data.authenticated && <div>
                <h2>Welcome, {name}!</h2>
                <input type="button" value="Sign out" onClick={handleSignOut}/>
                <PapersSearchForm handler={updateSearchTerm} setSearchTerm={setSearchTerm} setRewardStatusSearch={setRewardStatusSearch} />
                {props.data.loadingPapers && <p>Loading...</p>}
                {listOfPapers}
            </div>
            }
            {!props.data.authenticated && <div>
                <h2>Sign in</h2>
                <Form>
                    <Form.Group className="mb-3" onChange={handleUsername} controlId="username">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control aria-label="Default select example"/>
                    </Form.Group>

                    <Form.Group className="mb-3" onChange={handlePassword} controlId="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" aria-label="Default select example"/>
                    </Form.Group>

                    <Button variant="primary" onClick={handleClick}>
                        Log in
                    </Button>
                </Form>
            </div>
            }
        </div>
    );
}

export default AdminPage;