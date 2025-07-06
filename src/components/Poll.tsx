import { useState, useRef, useEffect } from "react";
import {
  Smile,
  MessageCircle,
  MoreHorizontal,
  Edit2,
  Trash,
  Save,
} from "lucide-react";

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

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [submittedComment, setSubmittedComment] = useState<string | null>(null);
  const [isEditingComment, setIsEditingComment] = useState(false);

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
      <img
        src="https://randomuser.me/api/portraits/men/2.jpg"
        className="w-6 h-6 rounded-full mr-2 self-end"
        alt="avatar"
      />

      <div className="relative">
        <div className="bg-[#f1f0ec] p-4 rounded-xl shadow-sm w-[210px] relative">
          <p className="text-sm mb-2 font-medium whitespace-nowrap text-[#3b2d00]">
            What do you want to eat?
          </p>

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
                    className={`w-4 h-4 border border-gray-300 rounded-full mr-3 ${isSelected ? "bg-black" : "bg-[#f1f0ec]"
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

          <p className="text-xs text-gray-400 mt-2 pl-8">
            {totalVotes} votes · {hasVoted ? "You voted" : "Vote to see results"}
          </p>

          {reactionEmoji && (
            <div
              className={`absolute -bottom-3 right-3 text-lg ${emojiAnimate ? "animate-bounce" : ""
                }`}
            >
              {reactionEmoji}
            </div>
          )}

          {showCommentBox && (
            <div className="mt-3">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-[180px] text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
                rows={2}
                placeholder="Write a comment..."
              />
              <button
                onClick={() => {
                  if (comment.trim()) {
                    setSubmittedComment(comment);
                    setComment("");
                    setIsEditingComment(false);
                    setShowCommentBox(false);
                  }
                }}
                className="mt-1 text-xs text-white bg-black px-3 py-1 rounded-md"
              >
                {isEditingComment ? "Save" : "Submit"}
              </button>
            </div>
          )}

          {submittedComment && !showCommentBox && (
            <div className="mt-3 ml-1 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 w-full shadow-sm text-gray-700 relative">
              💬 {submittedComment}
              <div className="absolute top-1 right-1 flex space-x-1">
                <Edit2
                  className="w-4 h-4 text-blue-500 cursor-pointer"
                  onClick={() => {
                    setComment(submittedComment);
                    setShowCommentBox(true);
                    setIsEditingComment(true);
                  }}
                />
                <Trash
                  className="w-4 h-4 text-red-500 cursor-pointer"
                  onClick={() => {
                    setSubmittedComment(null);
                    setComment("");
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div
          className="absolute top-1/2 -translate-y-1/2 flex items-center space-x-2"
          style={{ left: "34vh" }}
        >
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

          <MessageCircle
            className="w-4 h-4 text-gray-500 cursor-pointer"
            onClick={() => {
              setShowCommentBox((prev) => !prev);
              setIsEditingComment(false);
            }}
          />

          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Poll;
