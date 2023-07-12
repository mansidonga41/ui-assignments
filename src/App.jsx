import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "../styles/mixins/index.scss";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
}

export default App;
