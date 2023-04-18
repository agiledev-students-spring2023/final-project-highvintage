import React, { useState, useEffect } from "react";
import GenericHeader from "../components/GenericHeader";
import { useFormik } from "formik";
import axios from "axios";
import { requestURL } from "../requestURL";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

export default function DiscussionForm() {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const [success, setSuccess] = useState(null);
  const [discussion, setDiscussion] = useState(null);

  // discussion && console.log("Discussion", discussion);
  const onSubmit = async (values, { resetForm }) => {
    try {
      //date object not storing the same format as in mockdb
      // values.date = new Date();
      const formData = new FormData();
      
      values.date = new Date();
      formData.append("content", values.content);
      formData.append("title", values.title);
      formData.append("date", values.date);
      formData.append("comments", JSON.stringify(values.comments));
      const response = await axios
        .post(requestURL + "discussions/create", formData, {
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
        console.log("response.data", response.data);
        setSuccess(response.data.message);
        resetForm(); // Reset the form after successful submission
        setDiscussion(response.data.newDiscussion);
        //navigate back to discussion-home.
        navigate("/discussion-home");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the form");
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      date: "",
      comments: [],
    },
    onSubmit,
  });
  return (
    <>
      <GenericHeader pageName="Post Discussion" />
      <div className="flex justify-center items-center h-screen">
        <form
          className="bg-white p-10 rounded-lg "
          onSubmit={formik.handleSubmit}
        >
          {/* <h2 className="text-2xl font-bold mb-4"></h2> */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Your title goes here"
              className="w-full border border-gray-400 p-3 rounded-md"
              value={formik.values.title}
              onChange={formik.handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="discussionContent"
              className="block text-gray-700 font-bold mb-2"
            >
              Content
            </label>
            <textarea
              name="content"
              placeholder="What do you want to discuss today?"
              className="w-full border border-gray-400 p-2 rounded-md"
              rows="10"
              cols="40"
              value={formik.values.content}
              onChange={formik.handleChange}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-auto bg-gray-400 text-white px-10 py-2 rounded-md hover:bg-gray-700"
            >
              Submit
            </button>
          </div>
        </form>
        {/* Success Message */}
        {showMessage && (
          <div className="fixed top-0 left-0 w-full flex items-center justify-center">
            <div
              className=" p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-600 dark:text-green-300"
              role="alert"
            >
              <span className="font-medium">Successfully Posted!</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
