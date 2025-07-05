// MessageBubble.tsx
import React from "react";

type Props = {
    text: string;
    sender: "me" | "other";
    forceOneLine?: boolean;
    showTick?: boolean;
    seen?: boolean;
};

const MessageBubble = ({
    text,
    sender,
    forceOneLine,
    showTick,
    seen,
}: Props) => {
    const isMe = sender === "me";

    return (
        <div
            className={`flex ${isMe ? "justify-end" : "justify-start"} my-2 px-2`}
        >
            {!isMe && (
                <div className="relative mr-2 self-end">
                    <img
                        src="https://randomuser.me/api/portraits/women/1.jpg"
                        className="w-6 h-6 rounded-full"
                        alt="avatar"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full" />
                </div>
            )}

            <div
                className={`relative ${isMe ? "max-w-[80%] mr-2" : "max-w-[80%] mr-0"}`}
            >
                <div
                    className={`px-4 py-2 rounded-xl text-sm break-words ${isMe
                            ? "bg-[#ffeccd] text-gray-800"
                            : "bg-[#f1f0ec] text-gray-900"
                        } ${forceOneLine ? "whitespace-nowrap w-max" : ""}`}
                >
                    {text}
                </div>

                {isMe && showTick && seen !== undefined && (
                    <div className="absolute bottom-0 right-[-20px] w-4 h-4 rounded-full bg-[#ffeccd] flex items-center justify-center p-[1px]">
                        {seen ? (
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
                        ) : (
                            <div className="w-4 h-4 rounded-full bg-[#ffeccd] flex items-center justify-center p-[1px]">
                                <span className="w-[8px] h-[8px] rounded-full bg-white" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
