import { Routes, Route } from "react-router-dom";

// Import modules
import Footer from './components/Footer';
import Menu from './components/Menu';
import HomePage from './components/HomePage';
import Base from './components/Base';
import Papers from './components/Papers';
import Authors from './components/Authors';

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
					<Route path="/papers" element={<Papers />}/>
					<Route path="/authors/" element={<Authors />}/>
					<Route path="/authenticate/" />
					<Route path="/verify/" />
					<Route path="/update/" />
					<Route path="*" element={<p>Not found</p>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default Documentation;