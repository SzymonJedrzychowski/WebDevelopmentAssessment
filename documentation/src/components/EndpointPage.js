// Import modules.
import Paragraph from './Paragraph';
import Request from './Request';

/**
 * EndpointPage creates pages for every endpoint of the API.
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
            <Request formData={props.documentationData.form} />
        </div>
    );
}

export default EndpointPage;