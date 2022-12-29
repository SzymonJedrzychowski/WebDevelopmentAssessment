import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

// Import modules.
import Response from "./Response.js";

// Import styling.
import "../styles/Paragraph.css";

/**
 * Paragraph is responsible for creating and showing different parts of the API documenation.
 * 
 * @author Szymon Jedrzychowski
 */
function Paragraph(props) {
    // visible variable is used to determine if selected part should be displayed or not.
    const [visible, setVisible] = useState(true);

    // Open all paragraphs when changing page.
    useEffect(() => {
        setVisible(true);
    }, [props.data])

    // Handler for variable visible.
    const showDetails = () => {
        setVisible(!visible);
    }

    // Get text to show bsaed on the curl array (only for showing example request).
    const getText = (text) => {
        // Using react fragment so that no more html tags are needed, but key requirement is satisfied.
        if(Array.isArray(text)){
            return <pre><p>{text.map((value, key)=> <React.Fragment key={key}>{value}<br/></React.Fragment>)}</p></pre>;
        }
        return <pre><p>{text}</p></pre>;
    }

    // Function processValue is responsible for creating different parts of the documentation paragraph.
    const processValue = (value) => {
        // If value is an array, recursecily create another Paragraph.
        if (Array.isArray(value)) {
            if (value[0].componentClass !== "response") {
                const components = value.map((newValue, key) => <Paragraph data={newValue} key={key} />);
                return <ListGroup>
                    {components}
                </ListGroup>;
            }

            return <Response data={value} />;
        }

        // If value is not an array, display appropriate data.
        return (
            <div className={value.componentClass}>
                <div className="clickable">
                    {!visible &&
                        <svg onClick={showDetails} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM12 8v8m-4-4h8" /></svg>}
                    {visible &&
                        <svg onClick={showDetails} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM8 12h8" /></svg>}
                    <h3 onClick={showDetails}>{value.title}</h3>
                </div>
                {visible &&
                    <div className="dataContent">
                        {value.type && <p>Type: {value.type}</p>}
                        {value.requirements && <p>Required parameters: {value.requirements}</p>}
                        {value.text && <p>{value.text}</p>}
                        {value.curl && getText(value.curl)}
                        {value.possibleValues && <p>Possible values: {value.possibleValues}</p>}
                        {value.exampleValue && <p>Example of value: {value.exampleValue}</p>}
                        {value.responseData && <pre><p>{JSON.stringify(value.responseData, null, 2)}</p></pre>}
                        {Array.isArray(value.data) && <Paragraph data={value.data} />}
                    </div>
                }
            </div>);
    }

    return (
        <>
            {processValue(props.data)}
        </>
    );
}

export default Paragraph;