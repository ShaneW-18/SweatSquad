import React from "react";
import {
  FaHome,
  FaCompass,
  FaCalendarAlt,
  FaUserAlt,
  FaCog,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
  type props = {
    text: string;
  };
  const myProps: props = {
    text: "Home",
  };

  return (
    <div className="w-64 bg-gray-800 text-white bg-dg-200">
      <div className="p-4">
        <p className="text-[30px] font-bold flex items-center justify-center">
          Gym<span className="text-primary">Social</span>
        </p>
      </div>
      <div className="flex flex-col mt-6">
        <Link href="/dashboard">
          <div className="px-4 py-2 hover:bg-primary flex items-center --bg">
            <FaHome className="mr-2" /> {myProps.text}
          </div>
        </Link>
        <Link href="/explore">
          <div className="px-4 py-2 hover:bg-primary flex items-center --bg">
            <FaCompass className="mr-2" /> Explore
          </div>
        </Link>
        <Link href="/schedules">
          <div className="px-4 py-2 hover:bg-primary flex items-center --bg">
            <FaCalendarAlt className="mr-2" /> My Schedules
          </div>
        </Link>
        <Link href="/account">
          <div className="px-4 py-2 hover:bg-primary flex items-center --bg">
            <FaUserAlt className="mr-2" />
            Account
          </div>
        </Link>
        <Link href="/settings">
          <div className="px-4 py-2 hover:bg-primary flex items-center --bg">
            <FaCog className="mr-2" /> Settings
          </div>
        </Link>
      </div>
      <div className="flex mt-auto p-4">
        <Link href="/logout">
          <div className="hover:bg-primary flex items-center">
            <FiLogOut />{" "}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
