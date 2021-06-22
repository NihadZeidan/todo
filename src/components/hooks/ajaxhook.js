import { useEffect, useState, useContext } from "react";
import { userContext } from "../hooks/contextSettings";
// import axios from "axios";
let hold = [];
let hold2 = [];
let flag = true;
const useAjax = () => {
  const myContextSettings = useContext(userContext);
  const todoAPI = "https://nihad-api-server.herokuapp.com/todo";
  const [list, setList] = useState([]);

  let screenValues = list.slice(0, myContextSettings.itemPerScreen);

  function handleNextPage(e) {
    if (flag) {
      hold = list;
      flag = !flag;
    }
    screenValues = list.slice(myContextSettings.itemPerScreen);
    setList(screenValues);
  }

  function handlePrevPage(e) {
    // point = hold.indexOf(screenValues[0]);

    screenValues = hold.slice(0);
    setList(screenValues);
    flag = !flag;
  }

  list.sort((a, b) => {
    return a[myContextSettings.sortOn] - b[myContextSettings.sortOn];
  });

  function toggleCompletedTasks(e) {
    if (!myContextSettings.itemState) {
      let refresh = list.filter(
        (obj) => obj.complete === myContextSettings.itemState
      );
      setList(refresh);
      myContextSettings.itemState = !myContextSettings.itemState;
      hold2 = list;
    } else {
      setList(hold2);
      myContextSettings.itemState = !myContextSettings.itemState;
    }
  }

  const _addItem = (item) => {
    fetch(todoAPI, {
      method: "post",
      mode: "cors",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((savedItem) => {
        setList([...list, savedItem]);
      })
      .catch(console.error);
  };

  const _toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: "put",
        mode: "cors",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })
        .then((response) => response.json())
        .then((savedItem) => {
          setList(
            list.map((listItem) =>
              listItem._id === item._id ? savedItem : listItem
            )
          );
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: "get",
      mode: "cors",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => setList(data))
      .catch(console.error);
  };

  const deleteItem = (id) => {
    let url = `${todoAPI}/${id}`;
    fetch(url, {
      method: "delete",
      mode: "cors",
    })
      .then((data) => data.json())
      .catch(console.error);
  };

  const EditItem = (item) => {
    let url = `${todoAPI}/${item._id}`;
    fetch(url, {
      method: "put",
      mode: "cors",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((savedItem) => {
        setList(
          list.map((listItem) =>
            listItem._id === item._id ? savedItem : listItem
          )
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    _getTodoItems();
  }, []);

  return [
    _addItem,
    _toggleComplete,
    list,
    setList,
    deleteItem,
    EditItem,
    toggleCompletedTasks,
    handleNextPage,
    screenValues,
    handlePrevPage,
    flag,
  ];
};

export default useAjax;

// let preList = [
//   {
//     _id: "1",
//     complete: false,
//     text: "Clean the Kitchen",
//     difficulty: 3,
//     assignee: "Person A",
//     dueDate: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`,
//   },
//   {
//     _id: "2",
//     complete: false,
//     text: "Do the Laundry",
//     difficulty: 2,
//     assignee: "Person A",
//     dueDate: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`,
//   },
//   {
//     _id: "3",
//     complete: false,
//     text: "Walk the Dog",
//     difficulty: 4,
//     assignee: "Person B",
//     dueDate: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`,
//   },
//   {
//     _id: "4",
//     complete: true,
//     text: "Do Homework",
//     difficulty: 3,
//     assignee: "Person C",
//     dueDate: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`,
//   },
//   {
//     _id: "5",
//     complete: false,
//     text: "Take a Nap",
//     difficulty: 1,
//     assignee: "Person B",
//     dueDate: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`,
//   },
// ];
