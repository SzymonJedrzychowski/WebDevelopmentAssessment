import { Buffer } from 'buffer';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Import modules
import UpdateAward from './UpdateAward';

// Import styling
import '../styles/AdminPage.css';

function AdminPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSignOut = () => {
        setName("");
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        props.data.handleAuthenticated(false);
    }

    const awardDictionary = { "true": "true", null: "false" };

    const allPapers = props.data.papers.map(
        (value, key) => <section key={key}>
            <UpdateAward paper={value} awardDictionary={awardDictionary} handleUpdate={props.data.handleUpdate} handleSignOut={handleSignOut}/>
        </section>
    )

    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/verify",
                    {
                        method: 'POST',
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
                                setName(localStorage.getItem('name'));
                            }else{
                                localStorage.removeItem('name');
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
                        localStorage.setItem('name', json.data.name);
                    }
                })
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )
    }

    return (
        <div className="papersGroup">
            {props.data.authenticated && <div>
                <h1>Admin Page</h1>
                <div>Hello {name}</div>
                <input type="button" value="Sign out" onClick={handleSignOut} />
                {allPapers}
            </div>
            }
            {!props.data.authenticated && <div>
                <h2>Sign in</h2>
                <Form>
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