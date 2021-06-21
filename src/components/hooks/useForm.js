import { useState } from "react";

const useForm = (callBack) => {
  const [item, setItem] = useState({});

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callBack(item);
    e.target.reset();
  };

  return [handleInputChange, handleSubmit, item];
};

export default useForm;
