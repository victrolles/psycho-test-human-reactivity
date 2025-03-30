import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Test from './pages/Test'
import './App.css'

function App() {
  return (
    <Router basename="/psycho-test-human-reactivity">  {/* Important for GitHub Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test1" element={<Test isText={false} isPause={false} name="Experience_1.xlsx" />} />
        <Route path="/test2" element={<Test isText={true} isPause={false} name="Experience_2.xlsx" />} />
        <Route path="/test3" element={<Test isText={true} isPause={true} name="Experience_3.xlsx" />} />
      </Routes>
    </Router>
  );
}

export default App
