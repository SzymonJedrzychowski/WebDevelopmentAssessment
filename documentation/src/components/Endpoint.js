import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// Import modules.
import Paragraph from "./Paragraph";

function Endpoint(props) {
    const [key, setKey] = useState(0);

    const processValue = (value) => {
        if (Array.isArray(value)) {
            const components = value.map((newValue, key) => <Tab eventKey={key} key={key} title={newValue.title}><Endpoint data={newValue} index={key} /></Tab>);
            return <Tabs
                activeKey={key}
                onSelect={(key) => setKey(key)}
                className="mb-3"
            >
                {components}
            </Tabs>;
        }

        return (
            <div className={value.componentClass}>
                <div className="dataContent">
                    {value.responseStatus && <h2>Response status: {value.responseStatus}</h2>}
                    {value.responseDescription && <p className="responseDescription">{value.responseDescription}</p>}
                    <Paragraph data={value.data} />
                </div>
            </div>);
    }

    return (
        <>
            {processValue(props.data)}
        </>
    );
}

export default Endpoint;