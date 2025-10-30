import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "react-international-phone/style.css";
import "./styles/style.css";
import "./styles/fonts.css";
import './styles/slick.css';
import { initGTMTracking } from "./gtm";

initGTMTracking();

const root = createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter >
      <App />
    </BrowserRouter>
);
