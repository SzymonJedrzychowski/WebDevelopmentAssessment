import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import '../styles/PapersSearchForm.css'

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
    const resetSearch = (event) => {
        props.searchTerm("");
        props.paperSearchTerm("all");
        document.getElementById("search").value = "";
        document.getElementById("awardValue").value = "all"
    }

    return (
        <Form onSubmit={preventSubmission}>
            <Form.Control
                id="search"
                name="searchInput"
                onChange={updateSearchTerm}
                placeholder="Search"
                aria-label="Search"
            />
            <Form.Select id="awardValue" aria-label="Default select example" onChange={updateSearchTerm} name="paperTerm">
                <option value="all">All papers</option>
                <option value="true">Only rewarded papers</option>
                <option value="false">Only non-rewarded papers</option>
            </Form.Select>
            <Button onClick={resetSearch}>Reset</Button>
        </Form >
    );
}

export default PapersSearchForm;