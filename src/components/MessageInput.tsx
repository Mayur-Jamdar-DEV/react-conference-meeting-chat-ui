import React from "react";
import { Smile, Paperclip, ChevronDown, Plus } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="bg-white px-4 pt-2 pb-4 rounded-b-2xl">
      <div className="relative">
        <div
          className="bg-[#f3f4f6] rounded-2xl px-4 pb-12 relative"
          style={{ height: "110px" }}
        >
          <p className="text-sm text-gray-500 pt-[15px]">
            Message to Conference Meeting
          </p>

          <div className="absolute bottom-3 left-4 flex items-center gap-3">
            <button className="w-8 h-8 bg-white border border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
            <Smile className="w-5 h-5 text-gray-400 cursor-pointer" />
            <Paperclip
              className="w-5 h-5 text-gray-400 cursor-pointer"
              style={{ transform: "rotate(30deg)" }}
            />
          </div>

          <button className="absolute bottom-3 right-3 bg-black text-white text-xs px-4 py-2 rounded-lg flex items-center gap-2">
            <span>Send now</span>
            <span className="text-gray-500 text-sm">|</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
