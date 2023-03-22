import React from "react";

export default function SavedHeader(props) {
  //adds option for a view all button
  const viewAll = props;

  return (
    <>
      <div className="flex flex-row items-center justify-between mt-12 text-left bg-white">
        <h2 className="px-2 py-1 mt-5 ml-1 text-lg text-gray-900 font-bold">
          {props.pageName}
        </h2>
        <div className="flex-end">
          {viewAll ? (
            <button className="bg-gray-300 text-black px-3 py-2 rounded-lg ml-8">
              View All
            </button>
          ) : ""}
        </div>
        <hr className="h-1 py-1 bg-gray-300 border-0"></hr>
      </div>
    </>
  );
}