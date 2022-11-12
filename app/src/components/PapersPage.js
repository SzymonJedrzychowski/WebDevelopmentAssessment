import { useParams } from "react-router-dom";

/**
 * PapersPage
 * 
 * function that creates page for general papers and all categories
 * 
 * @author Szymon Jedrzychowski
 */
function PapersPage() {
    const pages = ["interactivity", "fullpapers", "wip", "competition", "doctoral", "rapid", "papers"];
    var { paper } = useParams();
    if (!paper) {
        return (
            <div>
                <h1>papers</h1>
                <p>Welcome to the papers!</p>
            </div>
        );
    }
    if (pages.includes(paper)) {
        return (
            <div>
                <h1>{paper}</h1>
                <p>Welcome to the {paper}!</p>
            </div>
        );
    } else {
        return (<p>Not found</p>);
    }
}

export default PapersPage;