import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Test1 from './pages/Test1'
import './App.css'

function App() {
  return (
    <Router basename="/psycho-test-human-reactivity">  {/* Important for GitHub Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test1 />} />
      </Routes>
    </Router>
  );
}

export default App
