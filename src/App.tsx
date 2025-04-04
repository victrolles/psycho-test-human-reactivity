import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Test from './pages/Test'
import './App.css'

function App() {
  return (
    <Router basename="/psycho-test-human-reactivity">  {/* Important for GitHub Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test1" element={<Test experience="color" />} />
        <Route path="/test2" element={<Test experience="shape" />} />
        <Route path="/test3" element={<Test experience="both" />} />
        <Route path="/test4" element={<Test experience="all" />} />
      </Routes>
    </Router>
  );
}

export default App
