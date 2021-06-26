import React from "react";
import { Form, Badge } from "react-bootstrap";
import { useContext } from "react";
import IF from "./todo/IF";
import "./todo/useSettingForm.scss";

import { userContext } from "../context/contextSettings";

let flag = "noChange";
function UserConfig() {
  const myContext = useContext(userContext);
  function handleSortChange(e) {
    myContext.setSortOn(e.target.value);
    flag = "changed";
  }
  function handleNumberChange(e) {
    myContext.setItemPerScreen(parseInt(e.target.value));
    flag = "changed";
  }

  return (
    <>
      <Form className="useSettingForm">
        <h3 className="title">User Settings</h3>
        <br />
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Number of Items per Screen</Form.Label>
          <Form.Control
            size="sm"
            type="number"
            name="perScreen"
            onChange={handleNumberChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicRange">
          <Form.Label>Sort-on Keyword</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            name="sortOn"
            onChange={handleSortChange}
          />
        </Form.Group>
        <IF condition={flag === "changed"}>
          <Badge className="settingsAlert" variant="danger" size="lg">
            {" "}
            Changes Reflected
          </Badge>
          {(flag = "")}
        </IF>
      </Form>
    </>
  );
}
export default UserConfig;

// <Form.Group>
//   {" "}
//   <Form.Label>Filter Preference</Form.Label>
//   <Form.Control
//     as="select"
//     onChange={(e) => myContext.setItemState(`${e.target.value}`)}
//   >
//     <option value="button">Show Toggle Button</option>
//     <option value="true">Only Completed Tasks</option>
//     <option value="false">Only Pending Tasks</option>
//   </Form.Control>
// </Form.Group>
