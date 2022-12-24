import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// Import modules.
import Paragraph from "./Paragraph";

// Import styling.
import "../styles/Endpoint.css";

function Endpoint(props) {
    const [key, setKey] = useState(0);

    const processValue = (value) => {
        if (Array.isArray(value)) {
            const components = value.map((newValue, key) => <Tab eventKey={key} key={key} title={newValue.title}><Endpoint data={newValue} index={key} /></Tab>);
            return <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                {components}
            </Tabs>;
        }

        return (
            <div className={value.componentClass}>
                {
                    <div className="dataContent">
                        {value.type && <p>Type: {value.type}</p>}
                        {value.text && <p>{value.text}</p>}
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

export default Endpoint;