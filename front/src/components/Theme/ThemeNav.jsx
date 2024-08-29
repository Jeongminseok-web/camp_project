import React from 'react';
import { themenavbar } from '../../utils/data';
import { Link } from 'react-router-dom';

const ThemeNav = ({ onSelectTheme }) => {
  return (
    <div className="px-2">
      <div className="w-full h-[full] border border-gray-300 rounded-md px-5 py-2 mt-2">
        <ul className="flex justify-between items-center">
          {themenavbar.map((menu, idx) => (
            <li key={idx} className="">
              <Link to="#" onClick={() => onSelectTheme(menu)}>
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThemeNav;
