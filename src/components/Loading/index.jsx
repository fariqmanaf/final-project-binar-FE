export const Loading = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <p className="text-[2.5vh] font-light animate-blink">{text}</p>
      <div className="relative w-[20rem] h-[8vh] bg-gray-200 rounded-xl overflow-hidden border-2 border-gray-300">
        <div className="absolute top-0 left-0 h-full bg-purple-600 rounded-xl animate-progress">
          <img src="/human_loading.svg" className="w-full h-full flex items-center justify-center animate-character" />
        </div>
      </div>
    </div>
  );
};
