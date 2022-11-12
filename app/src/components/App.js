import HomePage from './HomePage';
import { Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import PapersPage from './PapersPage'
import Menu from './Menu';

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
        <Route path="/papers" element={<PapersPage />} />
        <Route path="/papers/:paper" element={<PapersPage />} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;