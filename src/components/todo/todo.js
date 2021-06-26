import React, { useContext } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./todo.scss";
import IF from "./IF";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import { Navbar, Button } from "react-bootstrap";
import Config from "../configeration";
import Login from "../login";
import Register from "../register";

import { userContext } from "../../context/contextSettings";
import { AuthContext } from "../../context/authContext";

import useAjax from "../../hooks/ajaxhook";

function ToDo(props) {
  const myContextSettings = useContext(userContext);
  const myAuthContext = useContext(AuthContext);

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
        <IF condition={myAuthContext.UserObj.loggedIn}>
          <Link to="/config">
            <Button variant="primary" size="lg">
              Settings
            </Button>
          </Link>
        </IF>
        <IF condition={!myAuthContext.UserObj.loggedIn}>
          <Link to="/register">
            <Button variant="primary" size="lg">
              Register
            </Button>
          </Link>
        </IF>

        <Login />
      </Navbar>

      <Switch>
        <Route exact path="/config">
          <Config />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <IF condition={myAuthContext.UserObj.loggedIn}>
          <Route exact path="/">
            <IF condition={myAuthContext.validateAction("read")}>
              <header>
                <h2>
                  To Do List Manager (
                  {list.filter((item) => !item.complete).length} Tasks)
                </h2>
              </header>
            </IF>

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
                  Previous{" "}
                </Button>
              </IF>
            </div>
            <IF condition={myAuthContext.validateAction("update")}>
              <Button className="togle" onClick={toggleCompletedTasks}>
                {" "}
                Show/Hide Completed Tasks !
              </Button>
            </IF>
          </Route>
        </IF>
      </Switch>
    </>
  );
}

export default ToDo;
