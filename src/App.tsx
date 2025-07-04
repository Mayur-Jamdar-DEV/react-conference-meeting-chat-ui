import React from "react";
import Header from "./components/Header";
import MessageBubble from "./components/MessageBubble";
import AudioMessage from "./components/AudioMessage";
import Poll from "./components/Poll";
import MessageInput from "./components/MessageInput";
import TypingIndicator from "./components/TypingIndicator";

function App() {
  return (
    <div className="h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md h-full flex flex-col overflow-hidden relative">
        <Header />

        <div
          className="absolute left-0 right-0 flex justify-end pointer-events-none"
          style={{
            top: 80,
            zIndex: 5,
          }}
        >
          <div className="relative" style={{ right: "13px" }}>
            <MessageBubble text="It’s an evening. Let’s do that" sender="me" forceOneLine />
            <div
              className="absolute -bottom-[6px] w-4 h-4 rounded-full bg-[#ffeccd] flex items-center justify-center p-[1px]"
              style={{ left: "187px" }}
            >
              <svg
                viewBox="0 0 21 18"
                fill="none"
                stroke="#75552f"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[10px] h-[10px]"
              >
                <polyline points="16 6 10 14 6 11" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden px-4 py-2 z-0">
          <p className="text-xs text-gray-400 text-center my-2">23:40</p>
          <MessageBubble text="Where do we want to meet guys? I need to know before" sender="other" />
          <MessageBubble text="Hm ... Let me think" sender="me" />
          <AudioMessage />
          <Poll />
          <TypingIndicator />
        </div>

        <button
          className="absolute left-1/2 -translate-x-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center border border-gray-200"
          style={{ bottom: "141px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          aria-label="Scroll to bottom"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M19 12L12 19L5 12"
              stroke="#222"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <MessageInput />
      </div>
    </div>
  );
}

export default App;
