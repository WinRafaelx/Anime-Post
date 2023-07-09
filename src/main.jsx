import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import AddPost from "./components/AddPost.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import "./style.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add",
    element: <AddPost />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
