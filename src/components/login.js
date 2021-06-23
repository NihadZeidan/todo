import React, { useState, useContext } from "react";
import { AuthContext } from "./context/authContext";
import { Button } from "react-bootstrap";
import IF from "./todo/IF";
import "./todo/login.scss";

function Login() {
  const [input, setInput] = useState({});
  const myContext = useContext(AuthContext);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  console.log(`${input.username}, ${input.password}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    myContext.login(input.username, input.password);
    e.target.reset();
  };
  return (
    <>
      <IF condition={myContext.UserObj.loggedIn}>
        <Button
          variant="danger"
          className="logOutbtn"
          onClick={myContext.logOut}
        >
          {" "}
          Logout
        </Button>
      </IF>
      <IF condition={!myContext.UserObj.loggedIn}>
        <form onSubmit={handleSubmit} className="loginForm">
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          ></input>
          <Button variant="outline-dark" type="submit">
            {" "}
            Login{" "}
          </Button>
        </form>
      </IF>
    </>
  );
}

export default Login;
