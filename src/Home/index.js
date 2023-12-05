import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/details/1">ID 1</Link>
        </li>
        <li>
          <Link to="/details/2">ID 2</Link>
        </li>
        <li>
          <Link to="/details/3">ID 3</Link>
        </li>
        <li>
          <Link to="/details/4">ID 4</Link>
        </li>
        <li>
          <Link to="/details/5">ID 5</Link>
        </li>
      </ul>
    </div>
  );
}
export default Home;
