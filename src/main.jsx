import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { EventProvider } from "./context/EventContext.jsx";

// ✅ Tambahkan BrowserRouter
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <EventProvider>
        <App />
      </EventProvider>
    </BrowserRouter>
  </React.StrictMode>
);
