import React, { useContext } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./todo.scss";
import IF from "./IF";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import { Navbar, Button } from "react-bootstrap";
import Config from "../configeration";

import { userContext } from "../hooks/contextSettings";

import useAjax from "../hooks/ajaxhook";

function ToDo(props) {
  const myContextSettings = useContext(userContext);

  let [
    _addItem,
    _toggleComplete,
    list,
    setList,
    deleteItem,
    editItem,
    toggleCompletedTasks,
    handleNextPage,
    screenValues,
    handlePrevPage,
    flag,
  ] = useAjax();

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
        <Link to="/">
          <Button variant="primary" size="lg">
            Home
          </Button>{" "}
        </Link>
        <Link to="/config">
          <Button variant="primary" size="lg">
            Settings
          </Button>
        </Link>
      </Navbar>
      <header>
        <h2>
          To Do List Manager ({list.filter((item) => !item.complete).length})
        </h2>
      </header>

      <Switch>
        <Route exact path="/config">
          <Config></Config>
        </Route>

        <Route exact path="/">
          <section className="todo">
            <div>
              <TodoForm handleSubmit={_addItem} />
            </div>

            <div className="toDoList">
              <TodoList
                list={screenValues}
                handleComplete={_toggleComplete}
                handleDelete={deleteTask}
                handleEdited={editItem}
              />
            </div>
          </section>
          <div className="nextPrevButtons">
            <IF condition={list.length > myContextSettings.itemPerScreen}>
              <Button variant="danger" onClick={handleNextPage}>
                {" "}
                Next{" "}
              </Button>
            </IF>

            <IF condition={!flag}>
              <Button onClick={handlePrevPage} variant="warning">
                {" "}
                Back to the Beginning{" "}
              </Button>
            </IF>
          </div>
          <Button className="togle" onClick={toggleCompletedTasks}>
            {" "}
            Show/Hide Completed Tasks !
          </Button>
        </Route>
      </Switch>
    </>
  );
}

export default ToDo;
