import React from "react";
import ReactDOM from "react-dom/client";
import routesConfig from "./routesConfig";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "normalize.css";
import "./assets/main.css";

const router = createBrowserRouter(routesConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
