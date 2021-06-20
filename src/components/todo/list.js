import React from "react";
// import IF from "./IF";
// import { useState } from "react";
import { ListGroup } from "react-bootstrap";

function TodoList(props) {
  // const [edit, setEdit] = useState(false);
  // const [editedValues, setEditValues] = useState([]);

  const handleD = (e) => {
    let id = e.target.value;
    props.handleDelete(id);
  };

  // function toggleEditTask(e) {
  //   setEdit(!edit);
  //   let id = e.target.value;
  //   let findElement = props.list.find((item) => id == item._id);

  //   setEditValues(findElement);
  //   console.log(editedValues);
  // }
  
  // const handleSubmitEdit = (e) => {
  //   e.preventDefault();
  //   // props.handleEdited(editedValues);
  // };

  return (
    <>
      <ListGroup>
        {props.list.map((item) => (
          <>
            <ListGroup.Item
              onClick={() => props.handleComplete(item._id)}
              className={`complete-${item.complete.toString()}`}
              key={item._id}
              action
              variant={item.complete ? "success" : "danger"}
            >
              <span>
                <p>{item.text}</p>
                <p>
                  {" "}
                  Assigned to: {item.assignee} / Difficulty: {item.difficulty}%
                  / Due Date: {item.dueDate}
                </p>
              </span>
            </ListGroup.Item>
            <button onClick={handleD} value={item._id}>
              {" "}
              Delete{" "}
            </button>
            {/* <button onClick={toggleEditTask} value={item._id}>
              {" "}
              Edit{" "}
            </button> */}
          </>
        ))}
        {/* <IF condition={edit}>
          <form onSubmit={handleSubmitEdit}>
            <input type="text" name="text" placeholder="Edit the Task"></input>
            <input
              type="text"
              name="assignee"
              placeholder="Assigned to"
            ></input>
            <input type="range" name="difficulty"></input>
            <input type="date" name="dueDate" placeholder="Due Date"></input>
            <input type="submit" value="Edit"></input>
          </form>
        </IF> */}
      </ListGroup>
    </>
  );
}

export default TodoList;
