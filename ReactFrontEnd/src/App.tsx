import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import React from "react";

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;
