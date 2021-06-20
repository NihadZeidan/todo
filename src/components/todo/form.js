import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

function TodoForm(props) {
  const [item, setItem] = useState({});

  function handleInputChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    setItem({});
  }

  return (
    <>
      <br />
      <Form onSubmit={handleSubmit} className="from">
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
    </>
  );
}
export default TodoForm;
