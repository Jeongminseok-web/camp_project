import React from "react";
import Navbar from "../Navbar";
import LocalNav from "./LocalNav";
import MapPenel from "../MapPenel";

const index = () => {
  return (
    <div className="page-section">
      <Navbar />
      <div className="w-[80%] h-full felx flex-col pl-2">
        <div className="pb-2">
          <LocalNav />
        </div>
        <div className="w-full h-full">
          <div className="h-full w-[40%]">
            <MapPenel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
