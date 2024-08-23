import React from "react";
import { themenavbar } from "../../utils/data";
import { Link } from "react-router-dom";

const ThemeNav = () => {
  return (
    <div className="px-2">
      <div
        className="w-full h-[full] bg-green-300 px-5 border
      border-neutral-800 py-2"
      >
        <ul className="flex justify-between items-center">
          {themenavbar.map((menu, idx) => (
            <li key={idx} className="">
              <Link>{menu.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThemeNav;
