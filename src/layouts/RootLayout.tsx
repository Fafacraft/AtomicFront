import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

export default function RootLayout() {

  const SliderContext = React.createContext({
    value: 0,
    setValue: (v: number) => { }
  });

  const Provider: React.FC = ({ children }) => {
    const [value, setValue] = useState(3);
    return (
      <SliderContext.Provider value={{ value, setValue }}>
        {children}
      </SliderContext.Provider>
    );
  };

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
