import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsDetail from "./Home/FeaturedSection/NewsDetail/NewsDetail";
import FeaturedSection from "./Home/FeaturedSection/FeaturedSection";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<FeaturedSection />} />

        {/* Dynamic Route for News Detail */}
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
