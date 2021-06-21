import { useEffect, useState } from "react";
// import axios from "axios";

const useAjax = () => {
  const todoAPI = "https://nihad-api-server.herokuapp.com/todo";
  const [list, setList] = useState([]);

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

  return [_addItem, _toggleComplete, list, setList, deleteItem, EditItem];
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
