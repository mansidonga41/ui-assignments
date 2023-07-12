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
import OrderSummary from "./OrderSummary";

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
  {
    path: "/order-summary",
    element: (
      <DefaultLayout>
        <OrderSummary />
      </DefaultLayout>
    ),
  },
]);

export default router;
