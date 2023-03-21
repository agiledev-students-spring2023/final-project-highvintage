import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropDownMenuTwo from "../components/ShareDiscussion/DropDownSort";
export default function ShareDiscussion() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row -mb-7 mt-8">
          <div className="relative h-32 w-32">
            <div className="absolute ml-5 py-1 left-0 top-0 h-20 w-24 border-4 rounded-lg">
              <img
                src="https://ventureasheville.com/wp-content/uploads/2015/09/logo-placeholder.jpg"
                alt="logo"
              ></img>
            </div>
          </div>

          <div className="relative ml-10 mr-5 w-4/5 ">
            <Link to="/search">
              <button className="h-20 rounded-lg w-full p-4 text-gray-900 bg-gray-200 dark:bg-gray-600 dark:text-white">
                Search HighVintage
              </button>
            </Link>
          </div>
        </div>
        <hr className="w-full h-0 border-none pt-1 mb-4  bg-gray-700 border-0"></hr>
      </div>
      <div>
        <DropDownMenuTwo
          menuName="Sort By"
          optionOne="Most Recent"
          optionTwo="Most Popular"
        ></DropDownMenuTwo>
      </div>
    </>
  );
}
