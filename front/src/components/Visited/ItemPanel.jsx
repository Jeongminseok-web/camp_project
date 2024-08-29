import React, { useEffect } from "react";
import Item from "./Item";
import { fetchGetItemsData } from "../../redux/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";

const itemPanel = () => {
  return (
    <div className="w-full h-full">
      <Item />
    </div>
  );
};

export default itemPanel;
