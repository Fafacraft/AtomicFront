import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.tsx";
import { AuthDataProvider } from "../contexts/AuthDataContext.tsx";

export default function RootLayout() {
  return (
    <div className="app-root">
      <AuthDataProvider>
        <Navbar />

        {/* The current page goes here */}
        <main>
          <Outlet />
        </main>
      </AuthDataProvider>
    </div>
  );
}

