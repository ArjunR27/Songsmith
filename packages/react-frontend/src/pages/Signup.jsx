import { useState } from "react";
import PropTypes from "prop-types";
import "./Auth.css"

function SignupForm({handleSubmit, setMessage, setIsSuccess}) {
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
      <button
        type="submit">
          Sign Up
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
      setIsSuccess(false);
      return;
    } else if (creds.username === "") {
      setMessage("Username not provided");
      setIsSuccess(false);
      return;
    } else if (creds.password === "") {
      setMessage("Password not provided");
      setIsSuccess(false);
      return;
    } 
    handleSubmit(creds)
    setCreds({ username: "", password: "" });
  
  }
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setIsSuccess: PropTypes.func.isRequired,
};

export default function Signup() {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  function signupUser(creds) {
    const API_PREFIX = "https://songsmith.azurewebsites.net";

    const promise = fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 201) {
          setMessage("Signup successful!");
          setIsSuccess(true);
        } else if (response.status === 409) {
          setMessage("Username already taken");
          setIsSuccess(false);
        } else {
          setMessage("Signup Error");
          setIsSuccess(false);
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
        setIsSuccess(false);
      });

    return promise;
  }

  return (
    <>
      <div className="auth-page">
        <div className="auth-form-container">
          <h1 className="auth-form-header">Signup</h1>
          <SignupForm handleSubmit={signupUser} setMessage={setMessage} setIsSuccess={setIsSuccess}/>
          <div className={`auth-message ${isSuccess ? 'success' : 'error'}`}>{message}</div>
        </div>
      </div>
    </>
  );
}