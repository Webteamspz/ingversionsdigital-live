import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Global CSS: one for all components, one for responsive only
import "./styles/style.css";
import "./styles/responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
