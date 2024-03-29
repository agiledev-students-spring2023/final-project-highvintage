import React, { useState } from "react";
import axios from "axios";
import { requestURL } from "../../requestURL";
import { useNavigate } from "react-router-dom";
import config from "../../token";

export default function AddComment(props) {
  const [comment, setComment] = useState("");
  const [empty, setEmpty] = useState(true);

  const navigate = useNavigate();

  const photo = props.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

  function handleInput(value) {
    if (value.length <= 0) {
      setEmpty(true);
    } else {
      setComment(value);
      setEmpty(false);
    }
  }

  async function handleComment() {
    navigate(0);
    const commentObject = {
      type: props.type,
      postID: props.postID,
      comment: {
        author: props.id,
        body: comment,
      },
    };

    await axios.post(requestURL + "comments/add", commentObject, config);
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
          onClick={async (e) => {
            try {
              await handleComment();
            } catch (e) {
              navigate("/500");
            }
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
            className="object-cover w-12 h-12 rounded-full"
            src={photo}
            alt="User's profile"
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
