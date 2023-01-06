import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// Import modules.
import Paragraph from "./Paragraph";

/**
 * Response is responsible for creating and showing Responses part of the API documentation.
 *
 * @author Szymon Jedrzychowski
 */
function Response(props) {
    // key variable is used to determine which Tab of the Tabs should be shown.
    const [key, setKey] = useState(0);

    // Reset currently displayed reponse when changing page.
    useEffect(() => {
        setKey(0);
    }, [props.data]);

    // Create Tabs and Tab for each response.
    const processValue = (value) => {
        if (Array.isArray(value)) {
            const components = value.map((newValue, key) => <Tab eventKey={key} key={key} title={newValue.title}><Response data={newValue} index={key} /></Tab>);

            return (<Tabs
                activeKey={key}
                onSelect={(key) => setKey(key)}
                className="mb-3"
            >
                {components}
            </Tabs>);
        }

        return (
            <div className={value.componentClass}>
                <div className="dataContent">
                    {value.responseStatus &&
                        <p className="responseStatus">Response status: {value.responseStatus}</p>
                    }
                    {value.responseDescription &&
                        <p className="responseDescription">{value.responseDescription}</p>
                    }
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

export default Response;