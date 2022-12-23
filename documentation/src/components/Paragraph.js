import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

// Import styling.
import "../styles/Paragraph.css";

function Paragraph(props) {
    const [visible, setVisible] = useState(true);

    const showDetails = () => {
        setVisible(!visible);
    }

    const processValue = (value) => {
        if (Array.isArray(value)) {
            const temp = value.map((value, key) => <Paragraph data={value} key={key}/>)

            return <ListGroup>
                {temp}
            </ListGroup>
        }
        return (
            <>
                <ListGroup.Item action onClick={showDetails}>
                    <h2>{value.title}</h2>
                </ListGroup.Item>
                {visible &&
                    <>
                        {value.type && <p>Type: {value.type}</p>}
                        {value.text && <p>{value.text}</p>}
                        {Array.isArray(value.data) && <Paragraph data={value.data} />}
                    </>
                }
            </>);
    }

    return (
        <ListGroup>
            {processValue(props.data)}
        </ListGroup>
    );
}

export default Paragraph;