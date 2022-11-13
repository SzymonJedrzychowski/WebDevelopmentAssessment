import HomePage from './HomePage';
import { Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import PapersPage from './PapersPage'
import Menu from './Menu';

import InteractivityPage from './InteractivityPage';
import FullpapersPage from './FullpapersPage';
import WipPage from './WipPage';
import CompetitionPage from './CompetitionPage';
import DoctoralPage from './DoctoralPage';
import RapidPage from './RapidPage';

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
          <Route path="interactivity" element={<InteractivityPage />} />
          <Route path="fullpapers" element={<FullpapersPage />} />
          <Route path="wip" element={<WipPage />} />
          <Route path="competition" element={<CompetitionPage />} />
          <Route path="doctoral" element={<DoctoralPage />} />
          <Route path="rapid" element={<RapidPage />} />
        </Route>
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;