// Import modules.
import Paragraph from './Paragraph';

/**
 * EndpointPage creates pages for every endpoint of the api.
 * 
 * @author Szymon Jedrzychowski
 */
function EndpointPage({ documentationData }) {
    const toShow = documentationData.data.map((value, key) => <Paragraph data={value} key={key} />)

    return (
        <div className="endpoint">
            <h1>{documentationData.header}</h1>
            {toShow}
        </div>
    );
}

export default EndpointPage;