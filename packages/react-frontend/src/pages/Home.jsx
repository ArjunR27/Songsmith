import "./Home.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function HomeCenter({isAuthenticated}) {
  if (isAuthenticated) {
    return (
      <>
        <Link className="login-button" to="/songs">
          Start
        </Link>
      </>
    )
  } else {
    return (
      <>
        <Link className="login-button" to="/login">
          Log in
        </Link>
        <Link className="signup-button" to="/signup">
          Not a member? Sign up!
        </Link>
      </>
    )
  }
}

HomeCenter.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};


export default function Home({isAuthenticated}) {
  return (
    <>
      <div className="home">
        <img className="blacksmith-bg" src="blacksmith-bg.jpg" alt="" />
        <title className="songsmith-title">Songsmith</title>
        <h2 className="songsmith-subtitle">
          Forge breathtaking collections of songs.
        </h2>
        <HomeCenter isAuthenticated={isAuthenticated}></HomeCenter>
      </div>
    </>
  );
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
