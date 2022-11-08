import HomePage from './HomePage';
import { Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;