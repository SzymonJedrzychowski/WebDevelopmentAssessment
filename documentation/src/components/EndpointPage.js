// Import modules.
import Paragraph from './Paragraph';

/**
 * EndpointPage creates pages for every endpoint of the api.
 * 
 * @author Szymon Jedrzychowski
 */
function EndpointPage(props) {
    // Create paragraphs based on data in props.
    const toShow = props.documentationData.data.map((value, key) => <Paragraph data={value} key={key} />)

    return (
        <div className="endpoint">
            <h1>{props.documentationData.header}</h1>
            {toShow}
        </div>
    );
}

export default EndpointPage;