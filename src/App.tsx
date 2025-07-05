// App.tsx
import React, { useState, useEffect } from "react";
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

  const handleSend = (text: string) => {
    if (text.trim() !== "") {
      setMessages((prev) => [
        ...prev,
        { type: "text", text, sender: "me", seen: false },
      ]);
      setShowTyping(false);
    }
  };

  const handleTyping = () => {
    setShowTyping(true);
    setTimeout(() => setShowTyping(false), 2000);
  };

  useEffect(() => {
    const el = document.getElementById("message-content");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, showTyping]);

  return (
    <div className="h-screen bg-[#f3f4f6] flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-white rounded-2xl w-full max-w-md h-full flex flex-col relative overflow-hidden">
        <Header />

        <div
          id="message-content"
          className="flex-1 overflow-y-auto px-4 py-2 [&::-webkit-scrollbar]:hidden"
          style={{
            overflowX: "hidden",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
        >
          {/* Message sent earlier - manually placed before timestamp */}
          <MessageBubble
            text="It’s an evening. Let’s do that"
            sender="me"
            showTick
            seen={true}
          />

          <p className="text-xs text-gray-400 text-center my-2">23:40</p>

          {messages.map((msg, idx) => {
            // Avoid duplicate of already rendered message
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

          {/* Static typing indicator for "other" */}
          <TypingIndicator sender="other" />

          {/* Show "me" typing when user types */}
          {showTyping && <TypingIndicator sender="me" />}
        </div>

        <MessageInput onSend={handleSend} onTyping={handleTyping} />
      </div>
    </div>
  );
}

export default App;
