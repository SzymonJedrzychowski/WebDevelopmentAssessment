import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Buffer} from 'buffer';

// Import modules
import PapersSearchForm from "./PapersSearchForm";
import GenerateTable from "./GenerateTable";

// Import styling
import "../styles/TablePage.css";
import "../styles/AdminPage.css";

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
        value.title.toLowerCase().includes(searchTerm.toLowerCase())
        && (rewardStatusSearch === "all" || rewardStatusSearch === value.award));

    // Use the filter to get papers that should be shown
    let papersToShow = props.data.papers.filter(searchPapers);

    const awardDictionary = {"true": "true", null: "false"};

    return (
        <div className="pageContent">
            <h1>Admin Page</h1>
            {props.data.authenticated && <div>
                <div className="loggedIn">
                    <h2>Welcome, {name}!</h2>
                    <Button variant="primary" onClick={handleSignOut}>
                        Sign out
                    </Button>
                </div>

                <PapersSearchForm handler={updateSearchTerm} setSearchTerm={setSearchTerm}
                                  setRewardStatusSearch={setRewardStatusSearch}
                                  placeholder="Search for title"/>

                <GenerateTable dataToShow={papersToShow}
                               loadingData={props.data.loadingAuthors}
                               currentPage={currentPage}
                               setCurrentPageHandler={setCurrentPageHandler}
                               pageLimit={pageLimit}
                               setPageLimitHandler={setPageLimitHandler}
                               awardDictionary={awardDictionary}
                               handleUpdate={props.data.handleUpdate}
                               handleSignOut={handleSignOut}
                               type={"admin"}
                />
            </div>
            }
            {!props.data.authenticated && <div className="loginContent">

                <Form className="loginForm">
                    <h2>Sign in</h2>
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