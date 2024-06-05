import "./Header.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";

const INVALID_TOKEN = "INVALID_TOKEN";

function Header({ userId, isAuthenticated }) {
  const [username, setUsername] = useState("");

  const logoutUser = () => { 
    localStorage.setItem("authToken", INVALID_TOKEN);
    window.location.href = "/";
  };

  useEffect(() => {
    fetch(`https://songsmith.azurewebsites.net/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        return response.json();
      })
      .then((user) => {
        setUsername(user.username);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [userId]);

  function HeaderRight({ isAuthenticated }) {
    if (isAuthenticated)
      return (
        <div className="right-container">
          <div className="welcome">Welcome, {username}!</div>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    else {
      return (
        <div className="right-container">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      );
    }
  }

  HeaderRight.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  return (
    <header className="header">
      <div className="left-container">
        <Link to="/">
          <img className="songsmith-icon" src="songsmith-icon.png" alt="" />
        </Link>
        <div className="logo-container">
          <div className="logo kumar-one-font">Songsmith</div>
        </div>
      </div>
      <HeaderRight isAuthenticated={isAuthenticated} />
    </header>
  );
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Header;
