import React from "react";
import Navbar from "../Navbar";
import MapPenel from "../MapPenel";
import { GiSouthKorea } from "react-icons/gi";

const index = () => {
  return (
    <div className="page-section">
      <Navbar />
      <div className="flex justify-center items-center w-full h-full">
        <GiSouthKorea className="w-[40%] h-[40%]" />
      </div>

      {/* <MapPenel /> */}
    </div>
  );
};

export default index;
