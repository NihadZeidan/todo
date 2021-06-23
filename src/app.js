import React from "react";
import ToDo from "./components/todo/todo.js";
import SettingsProvider from "./components/hooks/contextSettings.js";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/context/authContext.js";

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
