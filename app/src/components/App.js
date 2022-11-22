import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import Header from './Header';
import Footer from './Footer';
import PapersPage from './PapersPage'
import Menu from './Menu';
import AuthorsPage from './AuthorsPage';
import AuthorPage from './AuthorPage';

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

  const getData = () => {
    return { papers, authors, loadingPapers, loadingAuthors };
  }

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
      <Header />
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage data={getData()}/>} />
        <Route path="/papers">
          <Route index element={<PapersPage data={getData()} />} />
          <Route path=":track" element={<PapersPage data={getData()} />} />
        </Route>
        <Route path="/authors/" element={<AuthorsPage data={getData()} />} />
        <Route path="/authors/:author_id" element={<AuthorPage data={getData()} />} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;