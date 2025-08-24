import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-4"></div>
        <h1 className="text-2xl font-bold text-purple-700">Loading...</h1>
        <p className="text-gray-400 mt-2">
          Please wait while we fetch data.
        </p>
      </div>
    </div>
  );
};

export default Loading;
