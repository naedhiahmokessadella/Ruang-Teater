import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { EventProvider } from "./context/EventContext";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <EventProvider>
        <App />
      </EventProvider>
    </BrowserRouter>
  </React.StrictMode>
);
