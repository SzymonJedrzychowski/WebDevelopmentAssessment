/**
 * This is the home page of the /app website.
 * 
 * @author Szymon Jedrzychowski
 */
function Base() {
    const response = {
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
        };
    
    return (
        <div className='endpoint'>
            <h1>Base</h1>
            <div>
                <section className="decription">
                    <h2>Decription</h2>
                    <p>Base endpoint can be used to get the general data of the project, including the author data.</p>
                </section>
                <section className="methods">
                    <h2>Supported methods:</h2>
                    <p><b>GET</b> /</p>
                </section>
                <section className="responses">
                    <h2>Responses:</h2>
                    <p><b>200</b></p>
                </section>
                <section className="exampleRequest">
                    <h2>Example request:</h2>
                    <a href="http://unn-w20020581.newnumyspace.co.uk/assessment/api/">http://unn-w20020581.newnumyspace.co.uk/assessment/api/</a>
                </section>
                <section className="exampleResponse">
                    <h2>Example response:</h2>
                    <p>{JSON.stringify(response)}</p>
                </section>
            </div>
        </div>
    );
}

export default Base;