import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

// Import styling
import '../styles/PapersSearchForm.css'

/**
 * PapersSearchForm component
 *
 * PapersSearchForm is responsible for displaying form that can be used to search
 * for specific papers - their titles or abstracts
 * 
 * @author Szymon Jedrzychowski
 */
function PapersSearchForm(props) {
    // Prevent submission of form (on pressing enter)
    const preventSubmission = (event) => event.preventDefault();
    
    // Handler for updating search term
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

    // Function to reset the search term
    const resetSearch = () => {
        props.setSearchTerm("");
        props.setRewardStatusSearch("all");
        document.getElementById("searchTerm").value = "";
        document.getElementById("awardValue").value = "all"
    }

    return (
        <Form onSubmit={preventSubmission} onChange={updateSearchTerm}>
            <Form.Control
                id="searchTerm"
                placeholder="Search for title or abstract"
                aria-label="Search"
            />
            <Form.Select id="awardValue" aria-label="Default select example">
                <option value="all">All papers</option>
                <option value="true">Only rewarded papers</option>
                <option value="false">Only non-rewarded papers</option>
            </Form.Select>
            <Button onClick={resetSearch}>Reset</Button>
        </Form >
    );
}

export default PapersSearchForm;