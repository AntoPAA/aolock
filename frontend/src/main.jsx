import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import connexion from "./services/connexion";

import App from "./App";
import HomePage from "./pages/HomePage";
import SeasonPage from "./pages/SeasonPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          const response = await connexion.get(`/products/latest`);
          return response.data;
        },
      },
      {
        path: "/products/season/winter",
        element: <SeasonPage />,
        loader: async () => {
          const response = await connexion.get(`/products/season/winter`);
          return response.data;
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
