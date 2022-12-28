import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';

// Import styling.
import "../styles/PapersAuthors.css"

/**
 * PapersAuthors displays the data of the paper (including authors).
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
function PapersAuthors(props) {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    // visible variable changes the visibility of given PapersAuthors component.
    const [visible, setVisible] = useState(false);

    // Get data of authors in specific paper.
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

    // Function showDetails is called when button of specific paper is pressed.
    const showDetails = () => {
        fetchAuthors();
        setVisible(!visible);
    }

    // Function modifyAuthors is responsible for changing repeating authors to empty space.
    const modifyAuthors = (authors) => {
        let dict = {};
        let tempAuthors = [];
        for (let i = 0; i < authors.length; i++) {
            // If author_id is not in the dictionary, add the data to tempAuthors array and add the id to the dictionary.
            if (!(authors[i].author_id in dict)) {
                tempAuthors.push(authors[i]);
                dict[authors[i].author_id] = 1;
            }
            // If yes, then add the entry without name of the author.
            else {
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

    // Create JSX variable with row for every author (and link to their page).
    const listOfAuthors =
        tempListAuthors.map(
            (value) => <tr key={value.author_id}>
                <td><Link className="authorLink"
                    to={"/authors/" + value.author_id}>{value.first_name} {value.middle_initial} {value.last_name}</Link>
                </td>
                <td>{value.country}</td>
                <td>{value.institution}</td>
                <td>{value.department}</td>
            </tr>
        );

    // Display data of paper and table with paper authors.
    return (
        <ListGroup.Item action onClick={showDetails}>
            <h2>{props.data.title}</h2>
            {visible &&
                <div className="paperInfo">
                    <p><b>Abstract:</b> {props.data.abstract}</p>
                    <div><b>Authors:</b>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>Institution</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOfAuthors}
                            </tbody>
                        </Table>
                        <p><b>Award status:</b> {props.data.award && "Received"}{!props.data.award && "Not received"}
                        </p>
                        {loading && <p>Data loading</p>}
                    </div>
                </div>
            }
        </ListGroup.Item>
    )
}

export default PapersAuthors;