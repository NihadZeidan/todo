import React from "react";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";

import "./todo.scss";

function ToDo(props) {
  const [list, setList] = useState([]);

  document.title = `Incomplete:${
    list.filter((item) => !item.complete).length
  } / Completed:${list.filter((item) => item.complete).length}`;

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let list2 = list.map((listItem) =>
        listItem._id === item._id ? item : listItem
      );
      setList(list2);
    }
  };

  useEffect(() => {
    let preList = [
      {
        _id: 1,
        complete: false,
        text: "Clean the Kitchen",
        difficulty: 3,
        assignee: "Person A",
        dueDate: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`,
      },
      {
        _id: 2,
        complete: false,
        text: "Do the Laundry",
        difficulty: 2,
        assignee: "Person A",
        dueDate: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`,
      },
      {
        _id: 3,
        complete: false,
        text: "Walk the Dog",
        difficulty: 4,
        assignee: "Person B",
        dueDate: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`,
      },
      {
        _id: 4,
        complete: true,
        text: "Do Homework",
        difficulty: 3,
        assignee: "Person C",
        dueDate: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`,
      },
      {
        _id: 5,
        complete: false,
        text: "Take a Nap",
        difficulty: 1,
        assignee: "Person B",
        dueDate: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`,
      },
    ];

    setList(preList);
  }, []);

  const deleteItem = (id)=>{
    let newValuesAfterDelete = list.filter((item) => item._id !== parseInt(id));
    console.log(newValuesAfterDelete)
    setList(newValuesAfterDelete);
  }

  const editItem = (edited)=>{
    setList(edited);
  }
 

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
          <TodoForm handleSubmit={addItem} />
        </div>

        <div className="toDoList">
          <TodoList list={list} handleComplete={toggleComplete} handleDelete={deleteItem} handleEdited={editItem} />
        </div>
      </section>
    </>
  );
}

export default ToDo;
