import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import GenericHeader from "../components/GenericHeader";
export default function Aboutus() {
  return (
    /*
    Using a placeholder image for logo. Needs to be changed to HighVintage logo
    */
    <>
      {/* <div className="fixed bg-white top-0 left-0 right-0 grid w-80 grid-cols-2 p-3">
        <FaLongArrowAltLeft />
      </div> */}
      <GenericHeader pageName = "Contact Us" />

      <div className="flex flex-wrap justify-center py-5">
        <div className="w-6/12 sm:w-4/12 pt-20 px-4">
          <img
            src="https://ventureasheville.com/wp-content/uploads/2015/09/logo-placeholder.jpg"
            alt="..."
            className="shadow-lg rounded max-w-full h-auto align-middle border-none"
          />
        </div>
      </div>
      <h1 className="text-center text-2xl font-extrabold">Contact Us</h1>
      <div className="flex items-center justify-center">
        <FaPhoneAlt />
        <h3 className="px-8 p-6 text-lg font-bold"> +1 123.456.789</h3>
      </div>
      <div className="flex items-center justify-center">
        <FaEnvelope />
        <h3 className="px-5 text-lg font-bold"> high.vintage@info</h3>
      </div>
    </>
  );
}
