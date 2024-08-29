import React from "react";
import Navbar from "../Navbar";

const index = ({}) => {
  return (
    <div className="w-[100%] h-[98vh] m-auto flex">
      <Navbar />
      <div className="w-[80%] h-full p-2">
        <ItemPanel />
      </div>
    </div>
  );
};

export default index;
