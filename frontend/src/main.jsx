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
import AccountUser from "./pages/AccountUser";

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
        path: "/products/:slug",
        element: <OneProduct />,
        loader: async ({ params }) => {
          return connexion
            .get(`/products/${params.slug}`)
            .then((res) => res.data);
        },
      },
      {
        path: "/products/season/winter",
        element: <SeasonPage />,
        loader: async () => {
          const response = await connexion.get(`/products/season/1`);
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
      {
        path: "/account",
        element: <AccountUser />,
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
