import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Buffer } from 'buffer';

// Import styling.
import "../styles/Request.css"

/**
 * Request creates form for interactive API request and the field with response.
 * 
 * @author Szymon Jedrzychowski
 */
function Request(props) {
    // visible variable is used to determine if selected part should be displayed or not.
    const [visible, setVisible] = useState(true);

    // responseData is a JSON response from API.
    const [responseData, setResponseData] = useState();

    // Open all paragraphs when changing page.
    useEffect(() => {
        setVisible(true);
        setResponseData();
    }, [props.formData])

    // Handler for variable visible.
    const showDetails = () => {
        setVisible(!visible);
    }

    // Send a request to get a data from API.
    const sendData = (event) => {
        let url = props.formData.url;
        let requestData = {
            method: props.formData.requestMethod
        }

        if (props.formData.requestType === "simpleGet") {
            url += "?"
            for (let i = 0; i < event.target.length - 1; i++) {
                if (event.target[i].value !== "") {
                    url += (event.target[i].id + "=" + event.target[i].value + "&")
                }
            }
            url = url.slice(0, -1);
        } else if (props.formData.requestType === "authenticate") {
            const encodedString = Buffer.from(event.target.username.value + ":" + event.target.password.value).toString('base64');
            requestData["headers"] = new Headers({ "Authorization": "Basic " + encodedString })
        } else if (props.formData.requestType === "verify") {
            requestData["headers"] = new Headers({ "Authorization": "Bearer " + event.target.token.value })
        } else if (props.formData.requestType === "update") {
            const formData = new FormData();
            formData.append('award', event.target.award.value);
            formData.append('paper_id', event.target.paper_id.value);
            requestData["headers"] = new Headers({ "Authorization": "Bearer " + event.target.token.value })
            requestData["body"] = formData;
        }

        fetch(url, requestData)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setResponseData(json);
                })
            .catch(
                (e) => {
                    console.log(e.message)
                })
        event.preventDefault();
    }

    const excluded = ["password", "affiliation", "award"];

    const form = props.formData.parameters.filter((value) => !excluded.includes(value)).map((value, key) =>
        <Form.Group key={key} className="mb-3" controlId={value}>
            <Form.Label>{value}</Form.Label>
            <Form.Control type="text" aria-label="Default select example" />
        </Form.Group>);

    const response = <div className="dataContent exampleResponse">
        <h4>Response:</h4>
        <pre><p>{JSON.stringify(responseData, null, 2)}</p></pre>
    </div>;

    return (
        <div className="interactiveRequest">
            <div className="clickable">
                {!visible &&
                    <svg onClick={showDetails} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM12 8v8m-4-4h8" /></svg>}
                {visible &&
                    <svg onClick={showDetails} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM8 12h8" /></svg>}
                <h3 onClick={showDetails}>Try the endpoint</h3>
            </div>
            {visible &&
                <Form onSubmit={sendData} className="tryForm">
                    {form}
                    {props.formData.parameters.includes("password") &&
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" aria-label="Default select example" />
                        </Form.Group>
                    }
                    {props.formData.parameters.includes("affiliation") &&
                        <Form.Group className="mb-3" controlId="affiliation">
                            <Form.Label>affiliation</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option key="0" value="">False</option>
                                <option key="1" value="true">True</option>
                            </Form.Select>
                        </Form.Group>
                    }
                    {props.formData.parameters.includes("award") &&
                        <Form.Group className="mb-3" controlId="award">
                            <Form.Label>award</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option key="0" value="true">Awarded</option>
                                <option key="1" value="false">Not awarded</option>
                            </Form.Select>
                        </Form.Group>
                    }
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>}
            {visible && response}
        </div>
    );
}

export default Request;