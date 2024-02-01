import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
      <div className="animate-spin w-10 h-10 border-t-4 border-green-500 border-solid rounded-full"></div>
    </div>
  );
};

export default Loader;
