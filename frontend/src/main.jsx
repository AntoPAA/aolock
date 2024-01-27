import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import connexion from "./services/connexion";
import { AuthProvider } from "./context/auth";

import App from "./App";
import HomePage from "./pages/HomePage";
import SeasonPage from "./pages/SeasonPage";
import Administration from "./pages/Administration";
import ProductTypePage from "./pages/ProductTypePage";
import FormLogin from "./pages/FormLogin";
import FormRegister from "./pages/FormRegister";
import OneProduct from "./pages/OneProduct";

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
        path: "/products/:id",
        element: <OneProduct />,
        loader: async ({ params }) => {
          const response = await connexion.get(`/products/${params.id}`);
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
      {
        path: "/products/type/:id",
        element: <ProductTypePage />,
        loader: async ({ params }) => {
          const response = await connexion.get(`/products/type/${params.id}`);
          return {
            products: response.data,
            typeLabel:
              response.data.length > 0 ? response.data[0].type_label : null,
          };
        },
      },
      {
        path: "/administration",
        element: <Administration />,
      },
      {
        path: "/login",
        element: <FormLogin />,
      },
      {
        path: "/register",
        element: <FormRegister />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
