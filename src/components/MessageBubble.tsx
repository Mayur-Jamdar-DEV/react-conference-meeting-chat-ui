import React from "react";
import { Check, CheckCircle } from "lucide-react";

type Props = {
    text: string;
    sender: "me" | "other";
    forceOneLine?: boolean;
    showTick?: boolean;
};

const MessageBubble = ({ text, sender, forceOneLine, showTick }: Props) => {
    const isMe = sender === "me";

    return (
        <div className={`flex ${isMe ? "justify-end" : "justify-start"} my-2`}>
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

            <div className={`relative ${isMe ? "max-w-[780%]" : "max-w-[80%]"}`}>
                <div
                    className={`px-4 py-2 rounded-xl text-sm text-[#3b2d00] break-words ${isMe
                        ? "bg-[#ffeccd] text-gray-800"
                        : "bg-[#f1f0ec] text-gray-900"
                        } ${forceOneLine ? "whitespace-nowrap w-max" : ""}`} style={{ position: 'relative', right: isMe ? '17px' : '0px' }}
                >
                    {text}
                </div>

                {/* Tick icon (for messages from me) */}
                {isMe && (showTick  || !forceOneLine) && (
                    <div className="absolute -bottom-[6px] -right-5 w-4 h-4 rounded-full bg-[#ffeccd] flex items-center justify-center p-[1px]" style={{ position: 'relative', left: isMe ? '133px' : '0px', bottom: '5px' }}>
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
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
