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
  const [post, setPost] = useState(null);

  post && console.log("post", post);

  const onSubmit = async (values, { resetForm, setFieldValue }) => {
    const formData = new FormData();
    formData.append("content", values.content);
    formData.append("location", values.location);
    formData.append("style", values.style);
    // append each uploaded file to the FormData object
    for (let i = 0; i < values.my_files.length; i++) {
      formData.append("my_files", values.my_files[i]);
    }

    const response = await axios
      .post(requestURL + "posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => {
        if (err && err.response) {
          console.log("Error :", err);
        }
      });
    if (response && response.data) {
      console.log("values", values);
      console.log("response.data", response.data);
      setSuccess(response.data.message);
      setFieldValue("my_files", []); // clear the file input field.. not working yet
      resetForm(); // Reset the form after successful submission
      setPost(response.data.newPost);
    }
  };

  const formik = useFormik({
    initialValues: {
      style: "Sporty & Athleisure",
      location: "",
      content: "",
      my_files: [],
    },
    onSubmit,
  });

  // console.log(formik.values);
  return (
    <div className="relative">
      {/* Header */}
      <div className="absolute z-30">
        <GenericHeader pageName="Share Outfits" />
      </div>

      {/* Success Message */}
      {success && (
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center ">
          <OutfitPostMsg
            success={success ? success : ""}
            className="z-20"
          ></OutfitPostMsg>
          {/* just to verify that post is created - to be deleted */}
          <div className="grid grid-rows-3 mt-4 bg-orange-100 p-4 rounded-lg">
            {post.files.my_files[0].filename && (
              <div>{`FILES: ${post.files.my_files[0].filename}`}</div>
            )}
            <div>{`STYLE: ${post.style}`}</div>
            <div>{`CONTENT: ${post.content}`}</div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="flex justify-center items-center relative z-0 h-screen">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-10 rounded-lg my-auto"
        >
          {/* File Upload */}
          <div className="mb-4">
            <label htmlFor="upload" className="text-gray-700 font-bold mb-2">
              Upload
            </label>
            <input
              type="file"
              name="my_files"
              className="pl-6"
              onChange={(e) => {
                formik.setFieldValue("my_files", e.currentTarget.files);
              }}
              multiple
            />
          </div>
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
              <option disabled value="">
                Select Style
              </option>
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
              <option disabled value="">
                Add Location
              </option>
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
  );
}
