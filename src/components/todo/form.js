import React, {useContext} from "react";
import IF from "./IF.js";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import useForm from "../../hooks/useForm.js";
import {AuthContext} from "../../context/authContext"


function TodoForm(props) {
 const myAuthContext = useContext(AuthContext)

  const [handleInputChange, handleSubmit] = useForm(cb);

  function cb(item) {
    props.handleSubmit(item);
  }

  return (
    <>
      <br />
      <IF condition= {myAuthContext.validateAction("create")}>
      <Form onSubmit={handleSubmit}>
        <h3 className="title">Add To Do Item</h3>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>To Do Item</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="text"
            placeholder="Add To Do List Item"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicRange">
          <Form.Label>Difficulty Rating</Form.Label>
          <Form.Control
            size="sm"
            type="range"
            name="difficulty"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Assigned To </Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="assignee"
            placeholder="Assigned To"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label> Due Date </Form.Label>
          <Form.Control
            size="sm"
            type="date"
            name="dueDate"
            placeholder="Date"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Item
        </Button>
      </Form>
      </IF>
    </>
  );
}
export default TodoForm;
