import Paragraph from "./Paragraph";

/**
 * Base is responsible for displaying documentation of base endpoint - /.
 * 
 * @author Szymon Jedrzychowski
 */
function Base() {

    const data = [
        {
            "class": "description",
            "title": "Description",
            "text": "Base endpoint can be used to get the general data of the project, including the author data."
        },
        {
            "class": "methods",
            "title": "Supported methods:",
            "text": "GET"
        },
        {
            "class": "responses",
            "title": "Responses:",
            "data": [
                {
                    "class": "response",
                    "title": "200",
                    "data": [
                        {
                            "class": "data",
                            "title": "length",
                            "type": "int",
                            "text": "Length of data array."
                        },
                        {
                            "class": "data",
                            "title": "message",
                            "type": "string",
                            "text": "Message about the status of the fetch. Default: Success."
                        },
                        {
                            "class": "data",
                            "title": "data",
                            "type": "array",
                            "text": "Array containing data fetched from the database.",
                            "data": [
                                {
                                    "class": "data",
                                    "title": "student",
                                    "type": "array",
                                    "text": "Array containing data about the student.",
                                    "data": [
                                        {
                                            "class": "data",
                                            "title": "first_name",
                                            "type": "string",
                                            "text": "First name of student."
                                        },
                                        {
                                            "class": "data",
                                            "title": "last_name",
                                            "type": "string",
                                            "text": "Last name of student."
                                        },
                                        {
                                            "class": "data",
                                            "title": "id",
                                            "type": "string",
                                            "text": "Id number of student."
                                        }
                                    ]
                                },
                                {
                                    "class": "data",
                                    "title": "module",
                                    "type": "array",
                                    "text": "Array containing data about the module.",
                                    "data": [
                                        {
                                            "class": "data",
                                            "title": "code",
                                            "type": "string",
                                            "text": "Module code."
                                        },
                                        {
                                            "class": "data",
                                            "title": "name",
                                            "type": "string",
                                            "text": "Name of of the module."
                                        }
                                    ]
                                },
                                {
                                    "class": "data",
                                    "title": "documentation",
                                    "type": "string",
                                    "text": "Link to the documentation website."
                                },
                                {
                                    "class": "data",
                                    "title": "conference_name",
                                    "type": "string",
                                    "text": "Name of the conference."
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    const toShow = data.map((value, key)=><Paragraph data={value} index={key} key={key}/>)

    return (
        <div className='endpoint'>
            <h1>Base</h1>
            {toShow}
        </div>
    );
}

export default Base;