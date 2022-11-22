import HomePageSearch from "./HomePageSearch";

/**
 * Home page component
 * 
 * This is the main landing page for the application
 * 
 * @author Szymon Jedrzychowski
 */
function HomePage(props) {
    return (
        <div>
            <h2>CHI PLAY '21: The Annual Symposium on Computer-Human Interaction in Play</h2>
            <HomePageSearch data={props.data}/>
        </div>
    );
}

export default HomePage;