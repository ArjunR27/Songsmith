import { React, useState, useEffect } from "react";
import "./Signup.css"

function SignupForm(props) {
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
        value={props.buttonLabel || "Signup"}
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


export default function Signup() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function signupUser(creds) {
    const API_PREFIX = "http://localhost:8000";
  
    const promise = fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
        } else {
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });
  
    return promise;
  }

  return (
    <>
      <div className="page">
        <SignupForm handleSubmit={signupUser}/>
      </div>
    </>
  );
}
