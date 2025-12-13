import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { VanProvider } from "./context/vanContext";
import "./index.css"; // Tailwind styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VanProvider>
      <App />
    </VanProvider>
  </React.StrictMode>
);
