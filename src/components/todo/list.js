import React from "react";
// import IF from "./IF";

// import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

function TodoList(props) {
  // const [edit, setEdit] = useState(false);
  // const [afterEdit, setAfterEdit] = useState([]);

  // function deleteTask(id) {
  //   let newList = props.list.filter((item) => id != item._id);
  //   props.Dtask(newList);
  // }

  // function toggleEditTask() {
  //   setEdit(!edit);
  // }

  // function handleEditForm(e) {
  //   e.preventDefault();
  //   setAfterEdit({ ...afterEdit, [e.target.name]: e.target.value });
  //   props.editOriginal(afterEdit);
  // }

  return (
    <ul>
      {props.list.map((item) => (
        <>
          <ListGroup>
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
            {/* <button onClick={deleteTask(item._id)}> Delete </button> */}
            {/* <button onClick={toggleEditTask}> Edit </button> */}

            {/* <IF condition={edit}>
              <form onSubmit={handleEditForm}>
                <input
                  type="text"
                  name="text"
                  placeholder="Edit the Task"
                ></input>
                <input
                  type="text"
                  name="assignee"
                  placeholder="Assigned to"
                ></input>
                <input type="range" name="difficulty"></input>
                <input
                  type="date"
                  name="dueDate"
                  placeholder="Due Date"
                ></input>
                <input type="submit" value="Edit"></input>
              </form>
            </IF> */}
          </ListGroup>
        </>
      ))}
    </ul>
  );
}

export default TodoList;
