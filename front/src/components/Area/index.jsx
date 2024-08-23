import React from "react";
import Navbar from "../Navbar";
import LocalNav from "./LocalNav";

const index = () => {
  return (
    <div className="page-section">
      <Navbar />
      <div className="w-[80%] h-[20vh]">
        <LocalNav />
      </div>
    </div>
  );
};

export default index;
