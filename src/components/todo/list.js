import React from "react";
import IF from "./IF";
import { useState, useContext } from "react";
import { ListGroup, Badge, Button, Form } from "react-bootstrap";
import "./list.scss";
import { AuthContext } from "../../context/authContext";

function TodoList(props) {
  const myAuthContext = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const handleD = (e) => {
    let id = e.target.value;
    props.handleDelete(id);
  };

  function toggleEditTask(e) {
    let id = e.target.value;
    setId(id);
    setEdit(!edit);
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    let _id = id;
    let text = e.target.text.value;
    let assignee = e.target.assignee.value;
    let difficulty = e.target.difficulty.value;
    let dueDate = e.target.dueDate.value;
    let data = {
      _id: _id,
      text: text,
      assignee: assignee,
      difficulty: difficulty,
      dueDate: dueDate,
    };
    props.handleEdited(data);
    e.target.reset();
    setEdit(!edit);
  };

  return (
    <>
      <ListGroup>
        {props.list.map((item) => (
          <>
            <ListGroup.Item
              className={`complete-${item.complete.toString()}`}
              key={item._id}
              action
              variant={item.complete ? "success" : "danger"}
            >
              <span onClick={() => props.handleComplete(item._id)}>
                <Badge
                  variant={item.complete ? "success" : "danger"}
                  className="compleatedOrNot"
                >
                  {item.complete ? "Completed" : "pending"}
                </Badge>
                <Badge variant="light" className="assignedTo">
                  {item.assignee}
                </Badge>
                <Badge variant="dark" className="difficulty">
                  Difficulty: {item.difficulty}%
                </Badge>

                <p>{item.text}</p>
                <p> Due Date: {item.dueDate}</p>
              </span>
              <div className="buttonContainer">
                <IF condition={myAuthContext.validateAction("delete")}>
                  <Button
                    size="sm"
                    onClick={handleD}
                    value={item._id}
                    variant="danger"
                  >
                    {" "}
                    X{" "}
                  </Button>
                </IF>
                <Button
                  onClick={toggleEditTask}
                  value={item._id}
                  variant="info"
                  size="sm"
                >
                  Edit
                </Button>
              </div>
            </ListGroup.Item>
          </>
        ))}
        <div className="formToEdit">
          <IF condition={edit}>
            <Form onSubmit={handleSubmitEdit}>
              <input type="hidden" name="_id"></input>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Edit the Task</Form.Label>
                <Form.Control size="sm" type="text" name="text" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Assigned To</Form.Label>
                <Form.Control size="sm" type="text" name="assignee" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Difficulty</Form.Label>
                <Form.Control size="sm" type="range" name="difficulty" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Due Date</Form.Label>
                <Form.Control size="sm" type="date" name="dueDate" />
              </Form.Group>

              <input type="submit" value="Edit"></input>
            </Form>
          </IF>
        </div>
      </ListGroup>
    </>
  );
}

export default TodoList;
