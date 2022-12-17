import { Buffer } from 'buffer';
import React, { useState, useEffect } from 'react';
import UpdateAward from './UpdateAward';

function AdminPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.data.handleAuthenticated(false)
    }

    const awardDictionary = {"true": "true", null: "false"};

    const allPapers = props.data.papers.map(
        (value, key) => <section key={key}>
            <UpdateAward paper={value} awardDictionary={awardDictionary} handleUpdate={props.data.handleUpdate} />
        </section>
    )

    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                props.data.handleAuthenticated(true)
            }
        }
        , [])

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
                    if (json.message === "success") {
                        props.data.handleAuthenticated(true)
                        localStorage.setItem('token', json.data.token);
                    }
                })
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )
    }

    return (
        <div>
            {props.data.authenticated && <div>
                <h2>Admin Page</h2>
                <input type="button" value="Sign out" onClick={handleSignOut} />
                {allPapers}
            </div>
            }
            {!props.data.authenticated && <div>
                <h2>Sign in</h2>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={handleUsername}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={handlePassword}
                />
                <input type="button"
                    value="Submit"
                    onClick={handleClick}
                />
            </div>
            }
        </div>
    );
}

export default AdminPage;