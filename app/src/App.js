import {Routes, Route} from "react-router-dom";
import React, {useState, useEffect} from 'react';

// Import modules
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import PapersPage from './components/PapersPage'
import Menu from './components/Menu';
import AuthorsPage from './components/AuthorsPage';
import AuthorPage from './components/AuthorPage';
import AdminPage from './components/AdminPage';

// Import styling
import './styles/App.css'

/**
 * App is responsible for loading data and routing to other pages.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
function App() {
    // States used for data loading.
    const [papers, setPapers] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [loadingPapers, setLoadingPapers] = useState(true);
    const [loadingAuthors, setLoadingAuthors] = useState(true);

    // State used for authentication.
    const [authenticated, setAuthenticated] = useState(false);

    // State used for fetching the data again after update of award.
    const [update, setUpdated] = useState(0);

    // Handler for update value.
    const handleUpdate = () => {
        setUpdated(update + 1)
    }

    // Return dictionary with data from database.
    const getData = () => {
        return {papers, authors, loadingPapers, loadingAuthors};
    }

    // Handler for authenticated value.
    const handleAuthenticated = (isAuthenticated) => {
        setAuthenticated(isAuthenticated)
    }

    // Return dictionary with data from database (plus data important for updates and authentication).
    const getAdminPageData = () => {
        return {papers, loadingPapers, authenticated, handleAuthenticated, handleUpdate}
    }

    // Get data of all papers.
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
    }, [update]);

    // Get data of all authors.
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
                <Menu/>
                <Routes>
                    <Route path="/" element={<HomePage data={getData()}/>}/>
                    <Route path="/papers">
                        <Route index element={<PapersPage data={getData()}/>}/>
                        <Route path=":track" element={<PapersPage data={getData()}/>}/>
                    </Route>
                    <Route path="/authors/" element={<AuthorsPage data={getData()}/>}/>
                    <Route path="/authors/:authorId" element={<AuthorPage data={getData()}/>}/>
                    <Route path="/admin" element={<AdminPage data={getAdminPageData()}/>}/>
                    <Route path="*" element={<p>Not found</p>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default App;