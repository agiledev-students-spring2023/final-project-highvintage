import React, { useState } from "react";
import { dummyComments } from "../../dummy/comments";
export default function AddComment(props) {
  const [comment, setComment] = useState("");
  const [empty, setEmpty] = useState(true);

  function handleInput(value) {
    console.log(value.length);
    if (value.length <= 0) {
      setEmpty(true);
    } else {
      setComment(value);
      setEmpty(false);
    }
  }

  function generateButton() {
    if (empty) {
      // return a button that does not initate any api call or visually tell the user they can post an empty comment

      return (
        <button
          type="submit"
          className="col-span-2 text-slate-400 "
          onSubmit={(e) => e.preventDefault()}
        >
          {" "}
          Post{" "}
        </button>
      );
    } else {
      return (
        <button
          type="submit"
          className="col-span-2 text-blue-400 "
          onSubmit={(e) => {
            e.preventDefault();
            // post comment here
          }}
        >
          {" "}
          Post{" "}
        </button>
      );
    }
  }

  return (
    <div className="bg-white fixed inset-x-0 bottom-0 border h-24 p-3">
      <div className="grid grid-cols-12 bg-white">
        <div className="col-span-2">
          {" "}
          <img
            className="h-14 ml-4 object-cover aspect-square"
            src={props.photo}
          />
        </div>
        <input
          onInput={(e) => handleInput(e.target.value)}
          className="border col-span-8 p-2"
          type="text"
          placeholder={"Add a comment as " + props.username}
        />{" "}
        {generateButton()}
      </div>
    </div>
  );
}
