import React, { useState, useEffect } from "react";
import GenericHeader from "../components/GenericHeader";
import { dummyStyles } from '../dummy/styles'
// import axios from "axios";

export default function OutfitForm() {
  const styles = dummyStyles
  const [style, setStyle] = useState("")

  const onStyleChangeHandler = (event) => {
      console.log("User Selected Style - ", event.target.value)
  }

  const [outfitContent, setOutfitContent] = useState("");
  // const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  //Handling form submit
  const handleSubmit = (e) => {
    e.preventDefault(); 

    //error mmessage needed
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
    console.log(`Style: ${style}`);
    console.log(`Outfit content: ${outfitContent}`);
  };
  return (
    <>
      <GenericHeader pageName="Share Outfits" />
      <div className="flex justify-center items-center h-screen">
      
        <form className="bg-white p-10 rounded-lg " onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="style"
              className="block text-gray-700 font-bold mb-2"
            >
              Style
            </label>
            <select required onChange={onStyleChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Select Style</option>
              {styles.map((style, index) => {
                    return <option key={index}>{style}</option>
                })
              }
            </select>
            {/* <input
              type="text"
              id="style"
              placeholder="Your title goes here"
              className="w-full border border-gray-400 p-3 rounded-md"
              value={style}
              onChange={(event) => setStyle(event.target.value)}
              required
            /> */}
          </div>
          <h2 className="text-2xl font-bold mb-4"></h2>
          <div className="mb-4">
            <label
              htmlFor="style"
              className="block text-gray-700 font-bold mb-2"
            >
              Location
            </label>
            <select onChange={onStyleChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Add Location</option>
              {styles.map((style, index) => {
                    return <option key={index}>{style}</option>
                })
              }
            </select>
          </div>
          <div className="mb-4">
            {/* <label
              htmlFor="outfitContent"
              className="block text-gray-700 font-bold mb-2"
            >
              Write a caption...
            </label> */}
            <textarea
              id="outfitContent"
              placeholder="Write a caption..."
              className="w-full border border-gray-400 p-2 rounded-md"
              rows="10"
              cols="40"
              value={outfitContent}
              onChange={(event) => setOutfitContent(event.target.value)}
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

        <div className=" p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-600 dark:text-green-300" role="alert">
        <span className="font-medium">Successfully Posted!</span> 
        </div>
        </div>
      )}
      </div>
      
    </>
  );
}
