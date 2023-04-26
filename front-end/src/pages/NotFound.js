import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="text-center mt-20 text-lg">
        {" "}
        Oops! Page or resource not found.{" "}
      </h1>
      <Link className="block text-center text-sky-500 underline" to={"/home"}>
        {" "}
        Back to High Vintage{" "}
      </Link>
    </>
  );
}
