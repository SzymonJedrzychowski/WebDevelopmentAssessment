import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';

// Import modules
import HomePage from './HomePage';
import Footer from './Footer';
import PapersPage from './PapersPage'
import Menu from './Menu';
import AuthorsPage from './AuthorsPage';
import AuthorPage from './AuthorPage';

// Import styling
import '../styles/App.css'

/**
 * App
 * 
 * 
 * @author Szymon Jedrzychowski
 */
function App() {
	const [papers, setPapers] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [loadingPapers, setLoadingPapers] = useState(true);
	const [loadingAuthors, setLoadingAuthors] = useState(true);

	// Return dictionary with data from database
	const getData = () => {
		return { papers, authors, loadingPapers, loadingAuthors };
	}

	// Get data of papers by API fetch
	useEffect(() => {
		fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/papers")
			.then(
				(response) => response.json()
			)
			.then(
				(json) => {
					setPapers(json.data)
					setLoadingPapers(false)
				}
			)
			.catch(
				(e) => {
					console.log(e.message)
				}
			)
	}, []);

	// Get data of authors by API fetch
	useEffect(() => {
		fetch("http://unn-w20020581.newnumyspace.co.uk/assessment/api/authors")
			.then(
				(response) => response.json()
			)
			.then(
				(json) => {
					setAuthors(json.data)
					setLoadingAuthors(false)
				}
			)
			.catch(
				(e) => {
					console.log(e.message)
				}
			)
	}, []);

	return (
		<div className="App">
			<div className="content">
				<Menu />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/papers">
						<Route index element={<PapersPage data={getData()} />} />
						<Route path=":track" element={<PapersPage data={getData()} />} />
					</Route>
					<Route path="/authors/" element={<AuthorsPage data={getData()} />} />
					<Route path="/authors/:author_id" element={<AuthorPage data={getData()} />} />
					<Route path="*" element={<p>Not found</p>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;