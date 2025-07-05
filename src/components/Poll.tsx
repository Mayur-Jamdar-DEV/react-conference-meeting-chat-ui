import React, { useState, useRef, useEffect } from "react";
import { Smile, MessageCircle, MoreHorizontal } from "lucide-react";

type PollOption = "Pizza" | "Burgers";
const emojiList = ["😊", "😂", "👍", "❤️", "🔥", "🎉", "😢", "😎", "🙏", "💡"];

const Poll = () => {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<PollOption | null>(null);
  const [votes, setVotes] = useState<Record<PollOption, number>>({
    Pizza: 4,
    Burgers: 4,
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [reactionEmoji, setReactionEmoji] = useState<string | null>(null);
  const [emojiAnimate, setEmojiAnimate] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleVote = (option: PollOption) => {
    if (hasVoted) return;
    setVotes((prev) => ({ ...prev, [option]: prev[option] + 1 }));
    setSelectedOption(option);
    setHasVoted(true);
  };

  const totalVotes = votes.Pizza + votes.Burgers;

  const handleEmojiReact = (emoji: string) => {
    setReactionEmoji(emoji);
    setEmojiAnimate(true);

    // Remove animation after one-time bounce
    setTimeout(() => setEmojiAnimate(false), 500);
    setShowEmojiPicker(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(e.target as Node)
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className="flex items-center justify-start my-2">
      {/* Avatar */}
      <img
        src="https://randomuser.me/api/portraits/men/2.jpg"
        className="w-6 h-6 rounded-full mr-2 self-end"
        alt="avatar"
      />

      <div className="relative">
        <div className="bg-[#f1f0ec] p-4 rounded-xl shadow-sm max-w-[280px] min-w-[210px] relative">
          <p className="text-sm mb-2 font-medium whitespace-nowrap text-[#3b2d00]">
            What do you want to eat?
          </p>

          {/* Poll Options */}
          <div className="flex flex-col gap-2">
            {(Object.keys(votes) as PollOption[]).map((item) => {
              const isSelected = selectedOption === item;
              const percent = ((votes[item] / totalVotes) * 100).toFixed(0);

              return (
                <div
                  key={item}
                  className={`flex items-center border rounded-lg py-2 px-3 text-sm shadow-sm cursor-pointer transition-all
                    ${hasVoted ? "bg-gray-100" : "bg-white hover:bg-gray-50"}
                    ${isSelected ? "ring-2 ring-black" : ""}
                  `}
                  onClick={() => handleVote(item)}
                >
                  <span
                    className={`w-4 h-4 border border-gray-300 rounded-full mr-3 ${
                      isSelected ? "bg-black" : "bg-[#f1f0ec]"
                    }`}
                  />
                  <span className="text-[#3b2d00] font-medium">{item}</span>
                  {hasVoted && (
                    <span className="ml-auto text-xs text-gray-500">{percent}%</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Vote Info */}
          <p className="text-xs text-gray-400 mt-2 pl-8">
            {totalVotes} votes · {hasVoted ? "You voted" : "Vote to see results"}
          </p>

          {/* Reaction Emoji (bottom-right corner) */}
          {reactionEmoji && (
            <div
              className={`absolute -bottom-3 right-3 text-lg ${
                emojiAnimate ? "animate-bounce" : ""
              }`}
            >
              {reactionEmoji}
            </div>
          )}
        </div>

        {/* Icon Actions (Smile + Emoji Picker) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 flex items-center space-x-2"
          style={{ left: "34vh" }}
        >
          {/* Emoji button with picker */}
          <div className="relative">
            <Smile
              className="w-4 h-4 text-gray-500 cursor-pointer"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            />
            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute bottom-10 right-0 z-10 bg-white border border-gray-200 shadow-md rounded-md p-2 flex flex-wrap gap-2 w-56"
              >
                {emojiList.map((emoji) => (
                  <button
                    key={emoji}
                    className="text-lg hover:scale-110 transition-transform"
                    onClick={() => handleEmojiReact(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          <MessageCircle className="w-4 h-4 text-gray-500" />
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Poll;
