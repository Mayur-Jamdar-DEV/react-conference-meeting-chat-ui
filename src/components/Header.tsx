import React from "react";
import { ArrowLeft, MoreHorizontal } from "lucide-react";

const Header = () => {
  return (
    <div className="header-container bg-white bg-opacity-60 backdrop-blur-sm rounded-t-2xl px-4 pt-3 border-b sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
          <h2 className="text-[18px] font-medium text-gray-800 meeting-title">Conference Meeting</h2>
          <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs text-gray-600">4h left</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center mb-1">
            <div className="flex -space-x-2">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                className="w-6 h-6 rounded-full border-2 border-white avatar-img"
                alt="avatar1"
              />
              <img
                src="https://randomuser.me/api/portraits/men/2.jpg"
                className="w-6 h-6 rounded-full border-2 border-white avatar-img"
                alt="avatar2"
              />
              <img
                src="https://randomuser.me/api/portraits/women/3.jpg"
                className="w-6 h-6 rounded-full border-2 border-white avatar-img"
                alt="avatar3"
              />
            </div>
            <div className="ml-1 px-2 h-6 text-xs rounded-full bg-gray-300 flex items-center justify-center border-2 border-white text-gray-700">
              +8
            </div>
          </div>
        </div>
      </div>

      <div className="time-info flex items-start gap-2 pl-7 pt-2">
        <div className="text-center">
          <p className="text-[24px] font-bold leading-none text-gray-900">6:00</p>
          <p className="text-xs text-gray-500">Sat, Dec 11</p>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="w-6 h-6 text-gray-400 mt-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>

        <div className="text-center">
          <p className="text-[24px] font-bold leading-none text-gray-900">7:00</p>
          <p className="text-xs text-gray-500">Sat, Dec 11</p>
        </div>

        <div className="flex space-x-1 mt-3 ml-auto pr-6">
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Header;
