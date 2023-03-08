import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function GenericHeader(props) {
  return (
    <>
      {" "}
      <div className="fixed bg-white top-0 left-0 right-0 grid w-80 grid-cols-2 p-3">
        {" "}
        <FaLongArrowAltLeft />
        <h1 className="text-center text-2xl font-extrabold">
          {" "}
          {props.pageName}
        </h1>{" "}
      </div>
    </>
  );
}
