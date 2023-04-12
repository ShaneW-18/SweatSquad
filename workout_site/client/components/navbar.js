import React from 'react';
import { FaHome, FaCompass, FaCalendarAlt, FaUserAlt, FaCog } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
        <p className="text-[30px] font-bold">Gym<span className='text-primary'>Social</span></p>
        </div>
        <div className="flex flex-col mt-6">
        <a href="#" className="px-4 py-2  hover:bg-primary flex items-center">
            <FaHome className="mr-2" /> Home
          </a>
          <a href="#" className="px-4 py-2 hover:bg-primary flex items-center">
          <FaCompass className="mr-2" />  Explore
          </a>
          <a href="#" className="px-4 py-2 hover:bg-primary flex items-center">
          <FaCalendarAlt className="mr-2" /> My Schedules
          </a>
          <a href="#" className="px-4 py-2 hover:bg-primary flex items-center">
          <FaUserAlt className="mr-2" />Account
          </a>
          <a href="#" className="px-4 py-2 hover:bg-primary flex items-end">
          <FaCog className="mr-2" /> Settings
          </a>
        </div>
        <div className="flex justify-end p-4">
          <a href="#" className="hover:bg-primary flex items-center">
            LogOut <FiLogOut />
          </a>
        </div>
      </div>
      <div className="flex-1 bg-gray-100"></div>
    </div>
  );
};

export default Navbar;