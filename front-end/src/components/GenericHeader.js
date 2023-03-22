import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function GenericHeader(props) {
  return (
    <>
      {" "}
      <div className="fixed bg-white top-0 left-0 right-0 w-full flex justify-between p-3">
        {" "}
        <FaLongArrowAltLeft />
        
        <h1 className="mt-2 text-center text-2xl font-extrabold">
          {" "}
          {props.pageName}
        </h1>{" "}

        <div className="flex items-center">
        <a href="/search" className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-search"></i>
        </a>
      </div>
      </div>
    </>
  );
}
