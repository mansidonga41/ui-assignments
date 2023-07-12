import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import DefaultLayout from "../components/defaultLayout/defaultLayout";
import { Home } from "./Home";
import YourCart from "./YourCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    ),
  },
  {
    path: "/my-cart",
    element: (
      <DefaultLayout>
        <YourCart />
      </DefaultLayout>
    ),
  },
]);

export default router;
