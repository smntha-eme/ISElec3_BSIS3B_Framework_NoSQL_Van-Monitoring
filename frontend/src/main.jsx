import React from "react";
import "./index.css";
import "./App.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { VanProvider } from "./context/vanContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VanProvider>
      <App />
    </VanProvider>
  </React.StrictMode>
);
