import React from "react";
import ToDo from "./components/todo/todo.js";
import SettingsProvider from "./context/contextSettings";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authContext";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <SettingsProvider>
          <AuthProvider>
            <ToDo />
          </AuthProvider>
        </SettingsProvider>
      </BrowserRouter>
    </>
  );
}
