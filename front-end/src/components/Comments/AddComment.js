import React, { useState } from "react";
import { lisa } from "../../dummy/lisaLi";
export default function AddComment() {
  const [comment, setComment] = useState("");
  const [empty, setEmpty] = useState(true);

  function handleInput(value) {
    setComment(value);
    setEmpty(false);
  }

  function handleEmpty() {
    console.log("YEA");
  }
  return (
    <div className="bg-white fixed inset-x-0 bottom-0 border h-24 p-3">
      <div className="grid grid-cols-12 bg-white">
        <div className="col-span-2">
          {" "}
          <img
            className="h-14 ml-4 object-cover aspect-square"
            src={lisa.profilePicture}
          />
        </div>
        <input
          onInput={(e) => handleInput(e.target.value)}
          onEmptied={(e) => handleEmpty(e.target.value)}
          className="border col-span-8 p-2"
          type="text"
          placeholder={"Add a comment as " + lisa.username}
        />{" "}
        <button type="submit" className="col-span-2 text-slate-400 ">
          {" "}
          Post{" "}
        </button>
      </div>
    </div>
  );
}
