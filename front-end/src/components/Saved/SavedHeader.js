import React from "react";
import { Link } from 'react-router-dom';

export default function SavedHeader(props) {
  return (
    <>
      <div
        className="grid grid-rows-1 grid-cols-2 mt-10 text-left bg-white"
        style={{
          gridTemplateColumns: "1fr auto",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <h2 className="px-2 py-1 mt-7 ml-2 text-xl text-gray-900 font-bold">
          {props.pageName}
        </h2>
        {props.showButton === "true" && (
          <button className="mt-7 m-1.5 mr-2 bg-gray-300 text-black px-3 py-1 rounded-lg ml-8 text-sm">
            <Link to={props.page}>View All</Link>
          </button>
        )}
      </div>
      <hr className="h-0.5 bg-gray-300"></hr>
    </>
  );
}
