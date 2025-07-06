import { ReactNode } from "react";
import {
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Paperclip,
} from "lucide-react";

type Props = {
  text: string;
  sender: "me" | "other";
  forceOneLine?: boolean;
  showTick?: boolean;
  seen?: boolean;
  children?: ReactNode;
};

const getFileIcon = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (!ext) return <Paperclip className="w-4 h-4 text-gray-500 mr-1" />;

  switch (ext) {
    case "pdf":
      return <FileText className="w-4 h-4 text-red-500 mr-1" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return <ImageIcon className="w-4 h-4 text-blue-400 mr-1" />;
    case "doc":
    case "docx":
      return <FileText className="w-4 h-4 text-blue-600 mr-1" />;
    case "mp4":
    case "mov":
    case "avi":
      return <Video className="w-4 h-4 text-purple-500 mr-1" />;
    case "mp3":
    case "wav":
      return <Music className="w-4 h-4 text-green-500 mr-1" />;
    default:
      return <Paperclip className="w-4 h-4 text-gray-500 mr-1" />;
  }
};

const parseTextWithFileIcon = (text: string) => {
  const match = text.match(/📎 (.+)$/);
  if (!match) return text;

  const fileName = match[1];
  const icon = getFileIcon(fileName);

  return (
    <span className="inline-flex items-center gap-1 text-sm">
      {text.replace(`📎 ${fileName}`, "")}
      <span className="ml-1 inline-flex items-center border border-gray-300 px-2 py-1 rounded bg-white text-xs text-gray-700">
        {icon}
        {fileName}
      </span>
    </span>
  );
};

const MessageBubble = ({
  text,
  sender,
  forceOneLine,
  showTick,
  seen,
  children,
}: Props) => {
  const isMe = sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} my-2 px-2`}>
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

      <div className={`relative ${isMe ? "max-w-[80%] mr-2" : "max-w-[80%] mr-0"}`}>
        <div
          className={`px-4 py-2 rounded-xl text-sm break-words ${isMe ? "bg-[#ffeccd] text-gray-800" : "bg-[#f1f0ec] text-gray-900"
            } ${forceOneLine ? "whitespace-nowrap w-max" : ""}`}
        >
          {parseTextWithFileIcon(text)}
          {children && <div className="mt-1">{children}</div>}
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
              <span className="w-[8px] h-[8px] rounded-full bg-white" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
