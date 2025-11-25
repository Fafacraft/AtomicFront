import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import WipPage from "./pages/WipPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,  // <-- Navbar is here
    children: [
      { index: true, element: <HomePage /> },
      { path: "*", element: <WipPage /> } // <- catch-all 404/placeholder
    ]
  }
  
]);

export default router;
