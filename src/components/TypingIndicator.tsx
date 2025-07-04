
const TypingIndicator = () => {
  return (
    <div className="flex justify-start my-2">
      <div className="relative mr-2 self-end">
        <img
          src="https://randomuser.me/api/portraits/women/1.jpg"
          className="w-6 h-6 rounded-full"
          alt="avatar"
        />
        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full" />
      </div>
      <div className="px-3 py-2 rounded-xl max-w-[40%]">
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0s]"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;