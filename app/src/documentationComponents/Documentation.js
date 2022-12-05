import { Routes, Route } from "react-router-dom";

// Import modules
import Footer from '../components/Footer';
import Menu from './Menu';
import HomePage from '../documentationComponents/HomePage';

// Import styling
import '../documentationStyles/Documentation.css'

/**
 * Main class for the /documentation page.
 * 
 * @author Szymon Jedrzychowski
 */
function Documentation() {
	return (
		<div className="Documentation">
			<div className="content">
			<Menu />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/base" />
				<Route path="/papers" />
				<Route path="/authors/" />
				<Route path="/authenticate/" />
				<Route path="*" element={<p>Not found</p>} />
			</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default Documentation;