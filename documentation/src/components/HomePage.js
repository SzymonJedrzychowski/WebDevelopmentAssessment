// Import styling.
import '../styles/HomePage.css';

/**
 * HomePage is responsible for showing home page of the documentation.
 * 
 * @author Szymon Jedrzychowski
 */
function HomePage() {
    return (
        <div className="homePage">
            <h1>API Documentation</h1>
            <div>
                <p>This documentation provides information about the API that can be used to get the data about papers and authors from CHI PLAY '21: The Annual Symposium on Computer-Human Interaction in Play. <br />
                    You can use the menu at the top to move to specific endpoints of the API and get information about them.
                </p>
            </div>
        </div>
    );
}

export default HomePage;