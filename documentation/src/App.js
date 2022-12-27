import { Routes, Route } from "react-router-dom";

// Import modules
import Footer from './components/Footer';
import Menu from './components/Menu';
import HomePage from './components/HomePage';
import EndpointPage from "./components/EndpointPage";

// Import styling
import './styles/Documentation.css'

// Import assets.
import baseData from './assets/Base.json';
import papersData from './assets/Papers.json';
import authorsData from './assets/Authors.json';
import authenticateData from './assets/Authenticate.json';
import verifyData from './assets/Verify.json';
import updateData from './assets/Update.json';

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
					<Route path="/base" element={<EndpointPage documentationData={baseData} />} />
					<Route path="/papers" element={<EndpointPage documentationData={papersData} />} />
					<Route path="/authors/" element={<EndpointPage documentationData={authorsData} />} />
					<Route path="/authenticate/" element={<EndpointPage documentationData={authenticateData} />} />
					<Route path="/verify/" element={<EndpointPage documentationData={verifyData} />} />
					<Route path="/update/" element={<EndpointPage documentationData={updateData} />} />
					<Route path="*" element={<p>Not found</p>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default Documentation;