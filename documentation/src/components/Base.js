import Paragraph from "./Paragraph";

/**
 * Base is responsible for displaying documentation of base endpoint - /.
 * 
 * @author Szymon Jedrzychowski
 */
function Base() {

    const data = [
        {
            "componentClass": "description",
            "title": "Description",
            "text": "Base endpoint can be used to get the general data of the project, including the author data."
        },
        {
            "componentClass": "methods",
            "title": "Supported methods:",
            "text": "GET"
        },
        {
            "componentClass": "responses",
            "title": "Responses:",
            "data": [
                {
                    "componentClass": "response",
                    "title": "200",
                    "responseStatus": "Success",
                    "responseDescription": "Successful request.",
                    "data": [
                        {
                            "componentClass": "data",
                            "title": "length",
                            "type": "int",
                            "text": "Length of data array."
                        },
                        {
                            "componentClass": "data",
                            "title": "message",
                            "type": "string",
                            "text": "Message about the status of the fetch. Default: Success."
                        },
                        {
                            "componentClass": "data",
                            "title": "data",
                            "type": "array",
                            "text": "Array containing data fetched from the database.",
                            "data": [
                                {
                                    "componentClass": "data",
                                    "title": "student",
                                    "type": "array",
                                    "text": "Array containing data about the student.",
                                    "data": [
                                        {
                                            "componentClass": "data",
                                            "title": "first_name",
                                            "type": "string",
                                            "text": "First name of student."
                                        },
                                        {
                                            "componentClass": "data",
                                            "title": "last_name",
                                            "type": "string",
                                            "text": "Last name of student."
                                        },
                                        {
                                            "componentClass": "data",
                                            "title": "id",
                                            "type": "string",
                                            "text": "Id number of student."
                                        }
                                    ]
                                },
                                {
                                    "componentClass": "data",
                                    "title": "module",
                                    "type": "array",
                                    "text": "Array containing data about the module.",
                                    "data": [
                                        {
                                            "componentClass": "data",
                                            "title": "code",
                                            "type": "string",
                                            "text": "Module code."
                                        },
                                        {
                                            "componentClass": "data",
                                            "title": "name",
                                            "type": "string",
                                            "text": "Name of of the module."
                                        }
                                    ]
                                },
                                {
                                    "componentClass": "data",
                                    "title": "documentation",
                                    "type": "string",
                                    "text": "Link to the documentation website."
                                },
                                {
                                    "componentClass": "data",
                                    "title": "conference_name",
                                    "type": "string",
                                    "text": "Name of the conference."
                                }
                            ]
                        }
                    ]
                },
                {
                    "componentClass": "response",
                    "title": "405",
                    "responseStatus": "Method Not Allowed",
                    "responseDescription": "Incorrect request method was used.",
                    "data": [
                        {
                            "componentClass": "data",
                            "title": "length",
                            "type": "int",
                            "text": "Length of data array."
                        },
                        {
                            "componentClass": "data",
                            "title": "message",
                            "type": "string",
                            "text": "Message about the error of the request."
                        },
                        {
                            "componentClass": "data",
                            "title": "data",
                            "type": "array",
                            "text": "Empty array.",
                        }
                    ]
                }
            ]
        },
        {
            "componentClass": "exampleRequest",
            "title": "Example of request",
            "link": "http://unn-w20020581.newnumyspace.co.uk/assessment/api/"
        },
        {
            "componentClass": "exampleResponse",
            "title": "Example of successful response",
            "responseData": {
                "length": 4,
                "message": "Success",
                "data": {
                    "student": {
                        "first_name": "Szymon",
                        "last_name": "Jedrzychowski",
                        "id": "w20020581"
                    },
                    "module": {
                        "code": "KF6012",
                        "name": "Web Application Integration"
                    },
                    "documentation": "http://unn-w20020581.newnumyspace.co.uk/assessment/api/documentation/",
                    "conference_name": "CHI PLAY '21: The Annual Symposium on Computer-Human Interaction in Play"
                }
            }
        }
    ];

    const toShow = data.map((value, key) => <Paragraph data={value} key={key} />)

    return (
        <div className="endpoint">
            <h1>Base</h1>
            {toShow}
        </div>
    );
}

export default Base;