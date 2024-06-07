import { useState } from "react";
import "./Auth.css"
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


function LoginForm({handleSubmit, setMessage}) {
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
    if (creds.username === "" && creds.password === "") {
      setMessage("Username and password not provided");
      return;
    } else if (creds.username === "") {
      setMessage("Username not provided");
      return;
    } else if (creds.password === "") {
      setMessage("Password not provided");
      return;
    } 
    handleSubmit(creds)
    setCreds({ username: "", password: "" });
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  
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
            const { token, userId } = payload; 
            if (token && userId) {
              localStorage.setItem("authToken", token);
              localStorage.setItem("userId", userId);
              props.setToken(token);
              props.setUserId(userId);
              setMessage("Login successful; auth token saved");
              navigate("/songs");
            } else {
              throw new Error("Invalid response data"); 
            }
          });
        } else {
          response.text().then(() => {
            setMessage(`Invalid username or password.`);
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
          <LoginForm handleSubmit={loginUser} setMessage={setMessage}/>
          <div className={`auth-message`}>{message}</div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
};


