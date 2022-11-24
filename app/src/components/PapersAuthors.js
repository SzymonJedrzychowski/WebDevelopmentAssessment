import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import "../styles/PapersAuthors.css"

function PapersAuthors(props) {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    const fetchAuthors = () => {
        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/authors?affiliation&paper_id=" + props.data.paper_id)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setAuthors(json.data);
                    setLoading(false)
                }
            )
            .catch((err) => {
                console.log(err.message);
            });
    }

    const showDetails = () => {
        fetchAuthors();
        setVisible(!visible);
    }

    const modifyAuthors = (authors) => {
        var dict = {};
        var tempAuthors = [];
        for (let i = 0; i < authors.length; i++) {
            if (!(authors[i].author_id in dict)) {
                tempAuthors.push(authors[i]);
                dict[authors[i].author_id] = 1;
            } else {
                tempAuthors.push(authors[i]);
                tempAuthors[i].author_id = tempAuthors[i].author_id + "_" + dict[authors[i].author_id];
                dict[authors[i].author_id] += 1
                tempAuthors[i].first_name = "";
                tempAuthors[i].middle_initial = "";
                tempAuthors[i].last_name = "";
            }
        }
        return tempAuthors;
    }

    const tempListAuthors = modifyAuthors(authors);

    const listOfAuthors =
    tempListAuthors.map(
            (value) => <tr key={value.author_id}>
                <td><Link className="authorLink" to={"/authors/" + value.author_id}>{value.first_name} {value.middle_initial} {value.last_name}</Link></td>
                <td>{value.country}</td>
                <td>{value.institution}</td>
            </tr>
        );

    return (
        <ListGroup.Item action onClick={showDetails}>
            <h2>{props.data.title}</h2>
            {visible && <div className="paperInfo">
                <p><b>Abstract:</b> {props.data.abstract}</p>
                <div><b>Authors:</b>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Institution</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfAuthors}
                        </tbody>
                    </Table>
                    <p><b>Award status:</b> {props.data.award && "Received"}{!props.data.award && "Not received"}</p>
                    {loading && <p>Loading...</p>}
                </div>
            </div>}
        </ListGroup.Item>
    )
}

export default PapersAuthors;