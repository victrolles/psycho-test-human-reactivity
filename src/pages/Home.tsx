import { Link } from "react-router-dom";
import "../styles/components.css";

function Home() {
  return (
    <div className="home">
      <h1>Home Page</h1>
      <div className="home-content">
        <Link to="/test1">
            <button>Test 1</button>
        </Link>
        <Link to="/test2">
            <button>Test 2</button>
        </Link>
        <Link to="/test3">
            <button>Test 3</button>
        </Link>
      </div> 
    </div>
  );
}

export default Home;
