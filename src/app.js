import React from "react";
import ToDo from "./components/todo/todo.js";
import SettingsProvider from "./components/hooks/contextSettings.js";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <>
    <BrowserRouter>
        <SettingsProvider>
          <ToDo />
        </SettingsProvider>
        </BrowserRouter>
    </>
  );
}
