import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";

// HashRouter keeps routes working on any host without extra server config
ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
