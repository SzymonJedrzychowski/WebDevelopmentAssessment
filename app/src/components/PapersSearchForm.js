import Form from 'react-bootstrap/Form';

function PapersSearchForm(props) {
    const preventSubmission = (event) => event.preventDefault();
    const updateSearchTerm = (event) => {
        if (event.target.id === "search") {
            props.handler(event.target.id, event.target.value);
        } else {
            let awardValue = event.target.value;
            if (awardValue === "false") {
                awardValue = null;
            } else {
                awardValue = event.target.value;
            }
            props.handler(event.target.id, awardValue);
        }
    }

    return (
        <div>
            <Form onSubmit={preventSubmission} className="d-flex">
                <Form.Control
                    id="search"
                    onChange={updateSearchTerm}
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Form.Select id="awardValue" aria-label="Default select example" onChange={updateSearchTerm}>
                    <option value="all">All papers</option>
                    <option value="true">Only rewarded papers</option>
                    <option value="false">Only non-rewarded papers</option>
                </Form.Select>
            </Form >
        </div>);
}

export default PapersSearchForm;