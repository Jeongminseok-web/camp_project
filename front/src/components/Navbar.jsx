import React, { useCallback, useEffect, useState } from "react";
import { GiCampingTent } from "react-icons/gi";
import { navMenus } from "../utils/data";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaTree } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ menuIdx }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const { name } = user || {};
  const googleClientId = process.env.REACT_APP_AUTH_CLIENT_ID;
  const [isAuth, setIsAuth] = useState(false);

  const handleLoginSucess = useCallback((response) => {
    const decoded = jwtDecode(response.credential);
    dispatch(login({ authData: decoded }));
    setIsAuth(true);
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("authData"));
    if (storedData) {
      dispatch(login({ authData: storedData }));
      setIsAuth(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleLoginSucess,
      });
    }
  }, [googleClientId, handleLoginSucess]);

  const handleLoginClick = () => {
    window.google.accounts.id.prompt();
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    setIsAuth(false);
  };
  return (
    <nav
      className="w-[20%] h-full flex flex-col justify-between
     items-center border border-neutral-800 py-5 bg-green-300 px-2
     overflow-hidden"
    >
      <div className="header-wrapper flex gap-x-2 items-center">
        <GiCampingTent className="w-10 h-10" />
        <span
          className="text-xl font-bold bg-gradient-to-r
         "
        >
          <Link to={"/"}>Camping Guide</Link>
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
        {isAuth ? (
          <button
            onClick={handleLogoutClick}
            className="flex justify-center items-center gap-2
           bg-white text-black py-2 px-4 rounded-md font-semibold"
          >
            <FcGoogle className="h-5 w-5" />
            {name}님 Logout
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            className="flex justify-center items-center gap-2
           bg-white text-black py-2 px-4 rounded-md font-semibold"
          >
            <FcGoogle className="h-5 w-5" />
            Login With Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
