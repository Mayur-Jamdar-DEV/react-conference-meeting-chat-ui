// App.tsx
import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import MessageBubble from "./components/MessageBubble";
import AudioMessage from "./components/AudioMessage";
import Poll from "./components/Poll";
import MessageInput from "./components/MessageInput";
import TypingIndicator from "./components/TypingIndicator";

type Sender = "me" | "other";

type ChatMessage =
  | { type: "text"; text: string; sender: Sender; seen?: boolean }
  | { type: "audio" }
  | { type: "poll" };

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: "text",
      text: "Where do we want to meet guys? I need to know before",
      sender: "other",
    },
    { type: "text", text: "Hm ... Let me think", sender: "me", seen: true },
    { type: "audio" },
    { type: "poll" },
  ]);

  const [showTyping, setShowTyping] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const messageContentRef = useRef<HTMLDivElement>(null);

  const handleSend = (text: string) => {
    if (text.trim() !== "") {
      setMessages((prev) => [
        ...prev,
        { type: "text", text, sender: "me", seen: false },
      ]);
      setShowTyping(false);
      scrollToBottom();
    }
  };

  const handleTyping = () => {
    setShowTyping(true);
    setTimeout(() => setShowTyping(false), 2000);
  };

  const scrollToBottom = () => {
    const el = messageContentRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    const el = messageContentRef.current;
    if (!el) return;

    const handleScroll = () => {
      const threshold = 100;
      const isNearBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
      setShowScrollToBottom(!isNearBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen bg-[#f3f4f6] flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-white rounded-2xl w-full max-w-md h-full flex flex-col relative overflow-hidden">
        <Header />

        <div
          ref={messageContentRef}
          id="message-content"
          className="flex-1 overflow-y-auto px-4 py-2 pb-12 [&::-webkit-scrollbar]:hidden"
          style={{
            overflowX: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <MessageBubble
            text="It’s an evening. Let’s do that"
            sender="me"
            showTick
            seen={true}
          />

          <p className="text-xs text-gray-400 text-center my-2">23:40</p>

          {messages.map((msg, idx) => {
            if (
              msg.type === "text" &&
              msg.text === "It’s an evening. Let’s do that"
            ) {
              return null;
            }

            if (msg.type === "text") {
              return (
                <MessageBubble
                  key={idx}
                  text={msg.text}
                  sender={msg.sender}
                  showTick={msg.sender === "me"}
                  seen={msg.seen}
                />
              );
            } else if (msg.type === "audio") {
              return <AudioMessage key={idx} />;
            } else if (msg.type === "poll") {
              return <Poll key={idx} />;
            }

            return null;
          })}

          {/* Typing indicators */}
          <div className="mt-2 space-y-1">
            <TypingIndicator sender="other" />
            {showTyping && <TypingIndicator sender="me" />}
          </div>
        </div>

        {/* Scroll to bottom button */}
        {showScrollToBottom && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-28 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center z-10 mb-6"
            aria-label="Scroll to bottom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 12l1.41-1.41L11 16.17V4h2v12.17l5.59-5.59L20 12l-8 8-8-8z" />
            </svg>
          </button>
        )}

        <MessageInput onSend={handleSend} onTyping={handleTyping} />
      </div>
    </div>
  );
}

export default App;
