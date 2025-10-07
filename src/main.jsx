import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "react-international-phone/style.css";
import "./styles/style.css";
import "./styles/fonts.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);