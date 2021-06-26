import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Form, Button, Badge } from "react-bootstrap";
import IF from "./todo/IF";
import "./todo/useSettingForm.scss";
let flag = "notRegistered";

function Register() {
  const [UserData, setUserData] = useState({});

  const myContext = useContext(AuthContext);

  const handleUserChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    myContext.register(UserData.username, UserData.password, UserData.role);
    e.target.reset();
    flag = "done";
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="useSettingForm">
        <h3 className="title">Registration Form </h3>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            size="sm"
            type="email"
            name="email"
            onChange={handleUserChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="username"
            onChange={handleUserChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicRange">
          <Form.Label>Password</Form.Label>
          <Form.Control
            size="sm"
            type="password"
            name="password"
            onChange={handleUserChange}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Role</Form.Label>
          <Form.Check
            type="radio"
            onChange={handleUserChange}
            name="role"
            label="Admin"
            value="admin"
          ></Form.Check>
          <Form.Check
            type="radio"
            onChange={handleUserChange}
            name="role"
            label="Editor"
            value="editor"
          ></Form.Check>
          <Form.Check
            type="radio"
            onChange={handleUserChange}
            name="role"
            label="User (View Only)"
            value="user"
          ></Form.Check>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <IF condition={flag === "done"}>
        <Badge variant="danger" size="lg">
          {" "}
          Done, You Are Registered, Please Login !
        </Badge>
        {/* {(flag = "")} */}
      </IF>
    </>
  );
}

export default Register;
