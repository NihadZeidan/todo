import React from "react";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import { Navbar } from "react-bootstrap";

import useAjax from "../hooks/ajaxhook";

import "./todo.scss";

function ToDo(props) {
  const [_addItem, _toggleComplete, list, setList, deleteItem, editItem] =
    useAjax();

  document.title = `Incomplete:${
    list.filter((item) => !item.complete).length
  } / Completed:${list.filter((item) => item.complete).length}`;

  const deleteTask = (id) => {
    let newValuesAfterDelete = list.filter((item) => item._id !== id);
    console.log(newValuesAfterDelete);
    setList(newValuesAfterDelete);
    deleteItem(id);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">HOME </Navbar.Brand>
      </Navbar>
      <header>
        <h2>
          To Do List Manager ({list.filter((item) => !item.complete).length})
        </h2>
      </header>

      <section className="todo">
        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div className="toDoList">
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
            handleDelete={deleteTask}
            handleEdited={editItem}
          />
        </div>
      </section>
    </>
  );
}

export default ToDo;
