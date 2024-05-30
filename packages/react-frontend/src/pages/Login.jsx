import { React, useState, useEffect } from "react";

function LoginForm(props) {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });

  return (
    <form>
      <label htmlFor="username">UserName</label>
      <input
        type="text"
        name="username"
        id="username"
        value={creds.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={creds.password}
        onChange={handleChange}
      />
      <input
        type="button"
        value={props.buttonLabel || "Log In"}
        onClick={submitForm}
      />
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

  function submitForm() {
    props.handleSubmit(creds);
    setCreds({ username: "", password: "" });
  }
}

function LoginPage() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(localStorage.getItem("authToken") || INVALID_TOKEN);
  //const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_PREFIX = "http://localhost:8000";

  function loginUser(creds) {
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
            setToken(payload.token);
            setMessage("Login successful; auth token saved");
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

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  function checkAuthentication() {
    fetch(`${API_PREFIX}/auth`, {
      method: "GET",
      headers: addAuthHeader(),
    })
      .then((response) => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
        console.log("Authentication check error:", error);
      });
  }

  useEffect(() => {
    if (token !== INVALID_TOKEN) {
      checkAuthentication();
    }
  }, [token]);

  return (
    <>
      <div className="page">
        <LoginForm handleSubmit={loginUser} />
        <div>Token: {token} </div>
        Authenticated: {`${isAuthenticated}`}
      </div>
    </>
  );
}

export default LoginPage;
