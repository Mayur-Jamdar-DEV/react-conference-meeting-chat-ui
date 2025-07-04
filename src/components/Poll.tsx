import React from "react";
import { Smile, MessageCircle, MoreHorizontal } from "lucide-react";

const Poll = () => {
  return (
    <div className="flex items-center justify-start my-2">
      <img
        src="https://randomuser.me/api/portraits/men/2.jpg"
        className="w-6 h-6 rounded-full mr-2 self-end"
        alt="avatar"
      />

      <div className="relative">
        <div className="bg-[#f1f0ec] p-4 rounded-xl shadow-sm max-w-[280px] min-w-[210px]">
          <p className="text-sm mb-2 font-medium whitespace-nowrap text-[#3b2d00]">
            What do you want to eat?
          </p>
          <div className="flex flex-col gap-2">
            {["Pizza", "Burgers"].map((item) => (
              <div
                key={item}
                className="flex items-center bg-white border rounded-lg py-2 px-3 text-sm shadow-sm"
              >
                <span className="w-4 h-4 border border-gray-300 rounded-full mr-3 bg-[#f1f0ec]"></span>
                <span className="text-[#3b2d00] font-medium">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2 pl-8">8 votes · Vote to see results</p>
        </div>

        <div
          className="absolute top-1/2 -translate-y-1/2 flex items-center space-x-2"
          style={{ left: "34vh" }}
        >
          <Smile className="w-4 h-4 text-gray-500" />
          <MessageCircle className="w-4 h-4 text-gray-500" />
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Poll;
