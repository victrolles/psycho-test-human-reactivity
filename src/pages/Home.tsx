import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Home Page</h1>
        <p>
            This is a simple home page. You can add more content to it if you want.
        </p>
        <Link to="/test">
            <button>Start Test</button>
        </Link>
    </div>
  );

}

export default Home;
