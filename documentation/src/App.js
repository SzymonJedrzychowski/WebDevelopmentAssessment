import { Routes, Route } from "react-router-dom";

// Import modules
import Footer from './components/Footer';
import Menu from './components/Menu';
import HomePage from './components/HomePage';
import Base from './components/Base';

// Import styling
import './styles/Documentation.css'

/**
 * Main class for the /documentation page.
 * 
 * @author Szymon Jedrzychowski
 */
function Documentation() {
	return (
		<div className="documentation">
			<div className="content">
				<Menu />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/base" element={<Base />} />
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