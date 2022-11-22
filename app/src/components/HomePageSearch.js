import { useState } from "react";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function HomePageSearch(props) {
    const [searchTerm, setSearchTerm] = useState("");

    const preventSubmission = (event) => event.preventDefault();
    const onChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const papersFilter = (value) => searchTerm && value.title.toLowerCase().includes(searchTerm.toLowerCase());
    const authorsFilter = (value) => searchTerm && (value.first_name + " " + value.middle_initial + " " + value.last_name).toLowerCase().includes(searchTerm.toLowerCase());

    const preparePapers = (papersToShow) => {
        return (<>
            <ListGroup.Item variant="primary">
                Papers
            </ListGroup.Item>
            {papersToShow.map((value) => (
                <Link to={"/papers/" + value.paper_id}><ListGroup.Item key={value.paper_id} variant="secondary">{value.title}</ListGroup.Item></Link>
            ))}
        </>
        );
    }

    const prepareAuthors = (authorsToShow) => {
        return (<>
            <ListGroup.Item variant="primary">
                Authors
            </ListGroup.Item>
            {authorsToShow.map((value) => (
                <Link to={"/authors/" + value.author_id}><ListGroup.Item key={value.author_id} variant="secondary">{value.first_name} {value.middle_initial} {value.last_name}</ListGroup.Item></Link>
            ))}
        </>
        );
    }

    let papersToShow = props.data.papers.filter(papersFilter);
    let authorsToShow = props.data.authors.filter(authorsFilter);

    if (papersToShow.length >= 5 && authorsToShow.length >= 5) {
        papersToShow = papersToShow.slice(0, 5);
        authorsToShow = authorsToShow.slice(0, 5);
    } else if (papersToShow.length < 5 && authorsToShow.length >= 5) {
        authorsToShow = authorsToShow.slice(0, 10 - papersToShow.length);
    } else if (papersToShow.length >= 5 && authorsToShow.length < 5) {
        papersToShow = papersToShow.slice(0, 10 - authorsToShow.length);
    }

    return (<div>
        <div>
            <Form onSubmit={preventSubmission}>
                <Form.Control
                    id="search"
                    onChange={onChange}
                    placeholder="Search for papers or authors"
                    className="me-2"
                    aria-label="Search"
                />
            </Form>
        </div>
        <div>
            <ListGroup>
                {
                    papersToShow.length > 0 && preparePapers(papersToShow)
                }
                {
                    authorsToShow.length > 0 && prepareAuthors(authorsToShow)
                }
            </ListGroup>
        </div>
    </div>)
}

export default HomePageSearch;