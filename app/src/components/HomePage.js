import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

// Import styling
import '../styles/HomePage.css';

// Import photos
// Product School, productschool, https://unsplash.com/photos/dJICd7b_LlE (Access date: 20.12.2022)
import photo from '../assets/mainPagePhoto.jpg';

/**
 * HomePage is responsible for displaying the home page.
 *
 * @author Szymon Jedrzychowski
 */
function HomePage(props) {
    // Deep copy the data to not cause original data to be sorted.
    const papersToShow = JSON.parse(JSON.stringify(props.data.papers)).sort(() => 0.5 - Math.random()).slice(0, 5);

    // Sending state so that useLocation hook can get the title of the clicked paper.
    const papersPrepared =
        <ListGroup>
            {papersToShow.map((value) =>
                <ListGroup.Item key={value.paper_id} as={Link} to="./papers" state={{ title: value.title }}>
                    {value.title}
                </ListGroup.Item>)}
        </ListGroup>;

    return (
        <div className='homePage'>
            <h1>Conference papers database</h1>
            <div className="homeSection">
                <div className="imageSection">
                    <img src={photo} alt="Tech conference" />
                </div>
                <div className="textSection">
                    <div className="homeText">
                        <h2>CHI PLAY '21: The Annual Symposium on Computer-Human Interaction in Play</h2>
                        <p>This website is a place where you can find different resources related to the CHI PLAY '21
                            symposium.
                            You can check out information about different <Link to={"./papers"}>papers</Link> that
                            were presented during the conference. <br />
                            Additionally, you can check out information about <Link to={"./authors"}>authors</Link> of
                            the papers.</p>
                    </div>
                    <div className="recommendation">
                        <h2>Recommended papers:</h2>
                        {papersPrepared}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;