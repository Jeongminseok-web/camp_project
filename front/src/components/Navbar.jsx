import React from "react";
import { GiCampingTent } from "react-icons/gi";
import { navMenus } from "../utils/data";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaTree } from "react-icons/fa6";

const Navbar = ({ menuIdx }) => {
  return (
    <nav
      className="w-[20%] h-full flex flex-col justify-between
     items-center border border-neutral-800 py-5 bg-green-300 px-2"
    >
      <div className="header-wrapper flex gap-x-4 items-center">
        <GiCampingTent className="w-10 h-10" />
        <span
          className="text-xl font-bold bg-gradient-to-r
         "
        >
          Camping Guide
        </span>
        {/* <FaTree className="w-8 h-8" /> */}
      </div>
      <div className="menubar-wrapper">
        <ul className="flex flex-col gap-y-4 text-md font-semibold">
          {navMenus.map((menu, idx) => (
            <li
              key={idx}
              className={`${
                menu.idx === menuIdx ? "bg-green-600" : ""
              }border border-neutral-800 px-5 py-2
               bg-green-400 hover:bg-green-600 rounded-md`}
            >
              <Link
                to={menu.to}
                className="flex gap-x-4 items-center
              justify-between"
              >
                {menu.icon}
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="login-wrapper">
        <button
          // onClick={handleLoginClick}
          className="flex justify-center items-center gap-2
           bg-white text-black py-2 px-4 rounded-md font-semibold"
        >
          <FcGoogle className="h-5 w-5" />
          Login Width Google
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
