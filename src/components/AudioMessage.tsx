import React from "react";

const AudioMessage = () => {
  return (
    <div className="flex justify-end my-2 relative pr-6" style={{ left: "9px" }}>
      <div className="audio-container flex items-center bg-[#ffeccd] px-3 py-2 rounded-xl w-[200px] shadow-[0_4px_12px_rgba(255,186,90,0.4)] relative pointer-events-none">
        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mr-2 shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="w-3 h-3 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        <input
          type="range"
          value={50}
          readOnly
          className="w-full h-[2px] appearance-none bg-transparent relative custom-range"
        />

        <span className="text-xs ml-1 shrink-0 text-gray-500">0:30</span>

        <div className="absolute -bottom-[6px] -right-5 w-4 h-4 rounded-full bg-[#ffeccd] flex items-center justify-center p-[1px]">
          <div className="w-[10px] h-[10px] bg-white rounded-full border border-[#ffeccd]"></div>
        </div>
      </div>

      <style>
        {`
          .custom-range::-webkit-slider-runnable-track {
            height: 2px;
            background: linear-gradient(to right, black 50%, #d1d5db 50%);
            border-radius: 999px;
          }

          .custom-range::-webkit-slider-thumb {
            appearance: none;
            width: 13px;
            height: 13px;
            background: white;
            border-radius: 999px;
            margin-top: -6px;
            pointer-events: none;
          }

          .custom-range::-moz-range-track {
            height: 2px;
            background: #d1d5db;
            border-radius: 999px;
          }

          .custom-range::-moz-range-progress {
            background: black;
            height: 2px;
            border-radius: 999px;
          }

          .custom-range::-moz-range-thumb {
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 999px;
            border: 1px solid black;
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
};

export default AudioMessage;
