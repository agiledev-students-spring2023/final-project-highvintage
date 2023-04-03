import React, { useState, useEffect } from "react";
import GenericHeader from "../components/GenericHeader";
import OutfitPostMsg from "../components/OutfitPost/OutfitPostMsg";
import { dummyStyles } from "../dummy/styles";
import { useFormik } from "formik";
import axios from "axios";
import { requestURL } from "../requestURL";

export default function OutfitForm() {
  const styles = dummyStyles;
  const [success, setSuccess] = useState(null);

  const onSubmit = async (values, { resetForm }) => {
    const response = await axios
      .post(requestURL + "posts/create", values)
      .catch((err) => {
        if (err && err.response) {
          console.log("Error :", err);
        }
      });
    if (response && response.data) {
      console.log("values", values);
      console.log("response.data", response.data);
      setSuccess(response.data.message);
      resetForm(); // Reset the form after successful submission
    }
  };

  const formik = useFormik({
    initialValues: {
      style: "Sporty & Athleisure",
      location: "",
      content: "",
    },
    onSubmit,
  });

  // console.log(formik.values);
  return (
    <>
      <GenericHeader pageName="Share Outfits" />

      <div className="relative">

        {success && (
          <div className="absolute inset-0 z-20 flex justify-center items-center">
            <OutfitPostMsg
              success={success ? success : ""}
              className=""
            ></OutfitPostMsg>
            </div>
          )}
        
        {/* Form */}
        <div className="flex justify-center items-center h-screen">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white p-10 rounded-lg relative z-10"
          >
            {/* Style */}
            <div className="mb-4">
              <label
                htmlFor="style"
                className="block text-gray-700 font-bold mb-2"
              >
                Style
              </label>
              <select
                name="style"
                required
                value={formik.values.style}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Select Style</option>
                {styles.map((style, index) => {
                  if (style !== "All") {
                    return <option key={index}>{style}</option>;
                  }
                })}
              </select>
            </div>

            {/* Location */}
            <h2 className="text-2xl font-bold mb-4"></h2>
            <div className="mb-4">
              <label
                htmlFor="style"
                className="block text-gray-700 font-bold mb-2"
              >
                Location
              </label>
              <select
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Add Location</option>
                {/* Integrate Gmaps */}
              </select>
            </div>

            {/* Content */}
            <div className="mb-4">
              <textarea
                placeholder="Write a caption..."
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                className="w-full border border-gray-400 p-2 rounded-md"
                rows="10"
                cols="40"
                required
              ></textarea>
            </div>

            {/* Post Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-auto bg-gray-400 text-white px-10 py-2 rounded-md hover:bg-gray-700"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
