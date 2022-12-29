import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Buffer } from 'buffer';

// Import modules.
import PapersSearchForm from "./PapersSearchForm";
import TablePage from "./TablePage";
import { generalHandlePageLimit, generalHandleCurrentPage } from "./Functions";

// Import styling.
import "../styles/AdminPage.css";

/**
 * AdminPage is responsible for handling page related to changing award status of papers and including the authentication.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
function AdminPage(props) {
    // States used for page navigation.
    const [pageLimit, setPageLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    // States used for search functionality.
    const [searchTerm, setSearchTerm] = useState('');
    const [rewardStatusSearch, setRewardStatusSearch] = useState('all');

    // States used for authentication.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    // State used when incorrect credentials were used.
    const [loginError, setLoginError] = useState(false);

    // Verify if current token is still valid (and get user name if token is valid).
    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/verify",
                    {
                        method: 'GET',
                        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token') })
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

    // Function that is responsible for handling authentication after pressing the sign in button.
    const handleClick = () => {
        const encodedString = Buffer.from(username + ":" + password).toString('base64');

        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/authenticate",
            {
                method: 'POST',
                headers: new Headers({ "Authorization": "Basic " + encodedString })
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
                    } else {
                        setLoginError(true);
                    }
                })
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )
    }

    // Handler for username value.
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    // Handler for password value.
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    // Handler for signing out.
    const handleSignOut = () => {
        setName("");
        localStorage.removeItem('token');
        props.data.handleAuthenticated(false);
    }

    // Handler for changing number of entries on page.
    const handlePageLimit = (event) => generalHandlePageLimit(event, setCurrentPage, setPageLimit);

    // Handler for changing current page.
    const handleCurrentPage = (event) => generalHandleCurrentPage(event, setCurrentPage);

    // Filter used for papers.
    const searchPapers = (value) => (
        value.title.toLowerCase().includes(searchTerm.toLowerCase())
        && (rewardStatusSearch === "all" || rewardStatusSearch === value.award));

    // Use the filter to get papers that should be shown.
    let papersToShow = props.data.papers.filter(searchPapers);

    // Dictionary used to change null values from API to "false".
    const awardDictionary = { "true": "true", null: "false" };

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

                <PapersSearchForm
                    setCurrentPage={setCurrentPage}
                    setSearchTerm={setSearchTerm}
                    setRewardStatusSearch={setRewardStatusSearch}
                    placeholder="Search paper by title" />

                <TablePage
                    dataToShow={papersToShow}
                    loadingData={props.data.loadingAuthors}
                    currentPage={currentPage}
                    handleCurrentPage={handleCurrentPage}
                    pageLimit={pageLimit}
                    handlePageLimit={handlePageLimit}
                    awardDictionary={awardDictionary}
                    handleUpdate={props.data.handleUpdate}
                    handleSignOut={handleSignOut}
                    type={"admin"}
                />
            </div>
            }

            {!props.data.authenticated && <div className="loginContent">
                {loginError && <div className="loginForm loginError">
                    <h2>Login error</h2>
                    <p>Incorrect credentials were used. Please try again.</p>
                </div>
                }
                <Form className="loginForm">
                    <h2>Sign in</h2>
                    <Form.Group className="mb-3" onChange={handleUsername} controlId="username">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control aria-label="Default select example" />
                    </Form.Group>

                    <Form.Group className="mb-3" onChange={handlePassword} controlId="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" aria-label="Default select example" />
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
