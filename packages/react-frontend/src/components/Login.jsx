import { useState } from "react";
import PropTypes from "prop-types";

function Login(props) {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCreds((prevCreds) => ({
      ...prevCreds,
      [name]: value,
    }));
  }

  function submitForm() {
    props.handleSubmit(creds);
    setCreds({ username: "", password: "" });
  }

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
}

Login.propTypes = {
  buttonLabel: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

export default Login;
