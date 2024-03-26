import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Test from "./Ahmed.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "normalize.css";
import "./css/dashboard.css";
import "./css/users.css";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
    <Test />
  </Router>
);
