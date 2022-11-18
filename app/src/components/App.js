import HomePage from './HomePage';
import { Routes, Route } from "react-router-dom";
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
  return (
    <div className="App">
      <Header />
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/papers">
          <Route index element={<PapersPage />} />
          <Route path=":track" element={<PapersPage />} />
        </Route>
        <Route path="/authors/" element={<AuthorsPage />} />
        <Route path="/authors/:author_id" element={<AuthorPage />} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;