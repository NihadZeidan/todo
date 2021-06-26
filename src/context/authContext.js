import React, { useEffect, useState } from "react";
import base from "base-64";
import jwt from "jsonwebtoken";
import myCookie from "react-cookies";
const API_URL = "https://api-js401.herokuapp.com";

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [UserObj, setUser] = useState({ loggedIn: false, cap: [""] });

  const register = async (username, password, role) => {
    let sendToServer = await fetch(`${API_URL}/signup`, {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        role,
      }),
    });

    let jsonData = await sendToServer.json();
    console.log(jsonData);
  };

  const login = async (username, password) => {
    let encodedData = base.encode(`${username}:${password}`);
    let sendToServer = await fetch(`${API_URL}/signin`, {
      method: "post",
      headers: { Authorization: `Basic ${encodedData}` },
    });

    let jsonData = await sendToServer.json();
    ValidateMyToken(jsonData.token);
  };

  const ValidateMyToken = (token) => {
    let decodeTheToken = jwt.decode(token);

    if (decodeTheToken) {
      TheUserIsLoggedIn(decodeTheToken, token);
    }
  };

  const TheUserIsLoggedIn = (decodeTheToken, token) => {
    let cap = decodeTheToken.capabilities;

    setUser({ cap, loggedIn: true });
    myCookie.save("token", token);
  };

  const logOut = () => {
    setUser({ loggedIn: false, cap: [""] });
    myCookie.remove("token");
  };

  useEffect(() => {
    let keepToken = myCookie.load("token");
    ValidateMyToken(keepToken);
    // eslint-disable-next-line
  }, []);  

  const validateAction = (action) => {
    return UserObj.cap.includes(action);
  };

  let state = {
    register,
    login,
    logOut,
    validateAction,
    UserObj,
  };

  return (
    <>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </>
  );
}

export default AuthProvider;
