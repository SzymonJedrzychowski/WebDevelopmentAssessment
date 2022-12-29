import ListGroup from 'react-bootstrap/ListGroup';
import Form from "react-bootstrap/Form";

/**
 * UpdateAward function is responsible for making a call to the API to update data of specific paper.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
function UpdateAward(props) {

    // Send call to API to update the entry.
    const handleChange = (event) => {
        const formData = new FormData();
        formData.append('award', event.target.value);
        formData.append('paper_id', props.paper.paper_id);

        const token = localStorage.getItem('token');

        fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/update",
            {
                method: 'POST',
                headers: new Headers({ "Authorization": "Bearer " + token }),
                body: formData
            })
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    if (json.message === "Success") {
                        props.handleUpdate()
                    } else {
                        props.handleSignOut();
                    }
                })
            .catch(
                (e) => {
                    console.log(e.message)
                })
    }

    return (
        <ListGroup.Item className="admin">
            <h2>{props.paper.title}</h2>
            <div className="selectOption">
                <Form.Select id="awardValue" aria-label="Default select example"
                    value={props.awardDictionary[props.paper.award]} onChange={handleChange}>
                    <option value="true">Awarded</option>
                    <option value="false">Not awarded</option>
                </Form.Select>
            </div>
        </ListGroup.Item>
    )
}

export default UpdateAward;