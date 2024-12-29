import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import React from "react";
import { useCookies } from "react-cookie";

function App() {
  const [cookie, setCookie] = useCookies(["cookie-consent"]);
  if (!cookie["cookie-consent"]) {
    setCookie("cookie-consent", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;
