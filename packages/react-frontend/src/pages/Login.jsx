import { useState } from "react";
import "./Auth.css"
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


function LoginForm(props) {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });

  return (
    <form onSubmit={submitForm}>
      <div className="auth-form-field">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={creds.username}
          onChange={handleChange}
        />
      </div>
      <div className="auth-form-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={creds.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">
        Log In
      </button>
    </form>
  );

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, password: value });
        break;
    }
  }

  function submitForm(event) {
    event.preventDefault();
    props.handleSubmit(creds);
    setCreds({ username: "", password: "" });
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

function LoginPage(props) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const API_PREFIX = "https://songsmith.azurewebsites.net";

  function loginUser(creds) {
    console.log(message);

    fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((payload) => {
            console.log(payload);
            localStorage.setItem("authToken", payload.token); // Store token in localStorage
            props.setToken(payload.token);
            setMessage("Login successful; auth token saved");
            navigate("/songs");
          });
        } else {
          response.text().then((text) => {
            setMessage(`Login Error ${response.status}: ${text}`);
          });
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });
  }


  return (
    <>
      <div className="auth-page">
        <div className="auth-form-container">
          <h1 className="auth-form-header">Login</h1>
          <LoginForm handleSubmit={loginUser}/>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};

