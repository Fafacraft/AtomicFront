import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.tsx";

export default function RootLayout() {
  return (
    <div className="app-root">
      <Navbar />

      {/* The current page goes here */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

