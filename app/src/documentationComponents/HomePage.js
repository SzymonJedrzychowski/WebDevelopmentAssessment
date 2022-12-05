// Import styling
import '../documentationStyles/HomePage.css';

/**
 * This is the home page of the /app website.
 * 
 * @author Szymon Jedrzychowski
 */
function HomePage() {
    return (
        <div className='homePage'>
            <h1>API Documentation</h1>
            <div>
                <p>This documentation provides information about the API </p>
            </div>
        </div>
    );
}

export default HomePage;