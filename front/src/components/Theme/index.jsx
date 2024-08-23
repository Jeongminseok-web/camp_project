import React from "react";
import Navbar from "../Navbar";
import ThemeNav from "./ThemeNav";

const index = () => {
  return (
    <div className="page-section">
      <Navbar />
      <div className="w-[80%] h-[20vh]">
        <ThemeNav />
      </div>
    </div>
  );
};

export default index;
