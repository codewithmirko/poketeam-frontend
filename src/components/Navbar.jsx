import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul>
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/">
        <li>Index</li>
      </Link>
      <Link to="/">
        <li>Gallery</li>
      </Link>
      <Link to="/about">
        <li>About</li>
      </Link>
    </ul>
  );
};

export default Navbar;
