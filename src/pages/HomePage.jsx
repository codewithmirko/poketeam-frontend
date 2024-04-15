import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>PokeTeam</h1>
      <Link to="/team">
        <button type="button">My Team</button>
      </Link>
      <Link to="/pokemon">
        <button type="button">All Pokemon</button>
      </Link>
      <Link to="/log-in">
        <button type="button">Log-In</button>
      </Link>
    </>
  );
};

export default HomePage;
