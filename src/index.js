import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // strict mode makes the App render twice
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
