import React from 'react';
import { FaHome, FaCompass, FaCalendarAlt, FaUserAlt, FaCog } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white bg-dg-300">
        <div className="p-4">
        <p className="text-[30px] font-bold">Gym<span className='text-primary'>Social</span></p>
        </div>
        <div className="flex flex-col mt-6">
        <a href="#" className="px-4 py-2  hover:bg-primary flex items-center --bg">
            <FaHome className="mr-2" /> Home
          </a>
          <a href="#" className="px-4 py-2 hover:bg-primary flex items-center --bg">
          <FaCompass className="mr-2" />  Explore
          </a>
          <a href="#" className="px-4 py-2 hover:bg-primary flex items-center --bg">
          <FaCalendarAlt className="mr-2" /> My Schedules
          </a>
          <a href="#" className="px-4 py-2 hover:bg-primary flex items-center --bg">
          <FaUserAlt className="mr-2" />Account
          </a>
          <a href="#" className="px-4 py-2 hover:bg-primary flex items-center --bg">
          <FaCog className="mr-2" /> Settings
          </a>
        </div>
        <div className="flex mt-auto p-4 ">
          <a className="hover:bg-primary flex items-center">
           <Link href={"/logout"} ><FiLogOut /> </Link>
          </a>
        </div>
      </div>
      <div className="flex-1 bg-gray-100"></div>
    </div>
  );
};

export default Navbar;