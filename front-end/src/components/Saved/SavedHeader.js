import React from "react";

export default function SavedHeader(props) {
  return (
    <>
      <div className="grid grid-rows-1 mt-10 text-left bg-white">
        <h2 className="px-2 py-1 mt-7 ml-1  text-lg text-gray-900 font-bold ">
          {props.pageName}
        </h2>
        <hr className="h-1 py-1 bg-gray-300 border-0"></hr>
      </div>
    </>
  );
}
