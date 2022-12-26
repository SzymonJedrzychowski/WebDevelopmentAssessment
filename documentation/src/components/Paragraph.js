import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

// Import modules.
import Endpoint from "./Endpoint.js";

// Import styling.
import "../styles/Paragraph.css";

function Paragraph(props) {
    const [visible, setVisible] = useState(true);
    const showDetails = () => {
        setVisible(!visible);
    }

    const processValue = (value) => {
        if (Array.isArray(value)) {
            if (value[0].componentClass !== "response") {
                const components = value.map((newValue, key) => <Paragraph data={newValue} key={key} />);
                return <ListGroup>
                    {components}
                </ListGroup>;
            }

            return <Endpoint data={value}/>;
        }

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
                        {value.possibleValues && <p>Possible values: {value.possibleValues}</p>}
                        {value.exampleValue && <p>Example of value: {value.exampleValue}</p>}
                        {value.link && <p>GET: <a href={value.link}>{value.link}</a></p>}
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