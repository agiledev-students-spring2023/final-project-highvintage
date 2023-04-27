import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-500"></div>
    </div>
  );
};

export default Loading;

