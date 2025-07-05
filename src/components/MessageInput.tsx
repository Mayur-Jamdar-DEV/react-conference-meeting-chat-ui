import React, { useState, useRef, useEffect } from "react";
import { Smile, Paperclip, ChevronDown, Plus } from "lucide-react";

type Props = {
  onSend: (text: string) => void;
  onTyping: () => void;
};

const emojiList = ["😊", "😂", "👍", "❤️", "🔥", "🎉", "😢", "😎", "🙏", "💡"];

const MessageInput = ({ onSend, onTyping }: Props) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    const fullMessage = file ? `${message} 📎 ${file.name}` : message;
    if (fullMessage.trim()) {
      onSend(fullMessage);
      setMessage("");
      setFile(null);
      setShowEmojiPicker(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    onTyping();
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className="bg-white px-4 pt-2 pb-4 rounded-b-2xl">
      <div className="relative pt-2">
        <div
          className="bg-[#f3f4f6] rounded-2xl px-4 pb-12 relative"
          style={{ height: "110px" }}
        >
          <textarea
            className="w-full bg-transparent text-sm resize-none focus:outline-none mt-1"
            placeholder="Message to Conference Meeting"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              onTyping();
            }}
            onKeyDown={handleKeyDown}
            rows={2}
          />

          <div className="absolute bottom-3 left-4 flex items-center gap-3">
            {/* Plus icon with square */}
            <button
              type="button"
              className="w-8 h-8 bg-white border border-gray-300 rounded-xl flex items-center justify-center shadow-sm"
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>

            {/* Emoji icon (no square) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              >
                <Smile className="w-5 h-5 text-gray-400" />
              </button>

              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute bottom-10 left-0 z-10 bg-white border border-gray-200 shadow-md rounded-md p-2 flex flex-wrap gap-2 w-56 max-w-[90vw]"
                >
                  {emojiList.map((emoji) => (
                    <button
                      key={emoji}
                      className="text-lg hover:scale-110 transition-transform"
                      onClick={() => handleEmojiSelect(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Paperclip (no square) */}
            <label className="cursor-pointer">
              <input type="file" hidden onChange={handleFileChange} />
              <Paperclip className="w-5 h-5 text-gray-400 transform rotate-[30deg]" />
            </label>
          </div>

          <button
            type="button"
            onClick={handleSend}
            className="absolute bottom-3 right-3 bg-black text-white text-xs px-4 py-2 rounded-lg flex items-center gap-2"
          >
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
