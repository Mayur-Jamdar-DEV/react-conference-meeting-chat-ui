// AudioMessage.tsx
import React, { useRef, useState, useEffect } from "react";
import { Pause, Play } from "lucide-react";

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

type Props = {
  url: string;
  sender: "me" | "other";
  onPlayRequest: (audioEl: HTMLAudioElement) => void;
};

const AudioMessage = ({ url, sender, onPlayRequest }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      onPlayRequest(audio); // 👈 Pause others
      audio.play();
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div className="flex justify-end my-2 relative pr-6" style={{ left: "9px" }}>
      <div className="audio-container flex items-center bg-[#ffeccd] px-3 py-2 rounded-xl w-[220px] shadow-[0_4px_12px_rgba(255,186,90,0.4)] relative">
        <button
          onClick={togglePlay}
          className="w-6 h-6 bg-black rounded-full flex items-center justify-center mr-2 shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-3 h-3 text-white" />
          ) : (
            <Play className="w-3 h-3 text-white" />
          )}
        </button>

        <input
  type="range"
  value={progress}
  readOnly
  className="w-full h-[2px] appearance-none bg-transparent relative custom-range"
  style={{
    background: `linear-gradient(to right, black ${progress}%, #d1d5db ${progress}%)`,
    borderRadius: "999px",
    WebkitAppearance: "none",
  }}
/>

        <span className="text-xs ml-2 shrink-0 text-gray-500">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <div className="absolute -bottom-[6px] -right-5 w-4 h-4 rounded-full bg-[#ffeccd] flex items-center justify-center p-[1px]">
          <div className="w-[10px] h-[10px] bg-white rounded-full border border-[#ffeccd]"></div>
        </div>

        <audio ref={audioRef} src={url} preload="metadata" />
      </div>

      <style>
        {`

          .custom-range::-webkit-slider-thumb {
            appearance: none;
            width: 13px;
            height: 13px;
            background: white;
            border-radius: 999px;
            margin-top: -1px;
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
      width: 13px;
      height: 13px;
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 999px;
      cursor: pointer;
    }

    .custom-range::-ms-thumb {
      width: 13px;
      height: 13px;
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 999px;
      cursor: pointer;
    }
        `}
      </style>
    </div>
  );
};

export default AudioMessage;
