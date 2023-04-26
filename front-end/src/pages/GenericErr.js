import React from "react";
import { Link } from "react-router-dom";

export default function GenericErr() {
  return (
    <>
      <h1 className="text-center mt-20 text-lg">
        {" "}
        Oops! Something went wrong internally.
      </h1>
      <Link className="block text-center text-sky-500 underline" to={"/home"}>
        {" "}
        Back to High Vintage{" "}
      </Link>
    </>
  );
}
