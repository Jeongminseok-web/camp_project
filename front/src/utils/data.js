import { IoHomeSharp } from "react-icons/io5";
import { GiSouthKorea } from "react-icons/gi";
import { FaHotjar } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { RiDoorOpenFill } from "react-icons/ri";

export const navMenus = [
  { label: "Home", to: "/", icon: <IoHomeSharp className="w-5 h-5" />, idx: 0 },
  {
    label: "Area",
    to: "/area",
    icon: <GiSouthKorea className="w-5 h-5" />,
    idx: 1,
  },
  {
    label: "Theme",
    to: "/theme",
    icon: <TbCategoryFilled className="w-5 h-5" />,
    idx: 2,
  },
  { label: "Hot", to: "/hot", icon: <FaHotjar className="w-5 h-5" />, idx: 3 },
  {
    label: "Visited",
    to: "/visited",
    icon: <RiDoorOpenFill className="w-5 h-5" />,
    idx: 4,
  },
];
