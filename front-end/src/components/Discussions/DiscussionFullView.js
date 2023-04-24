import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaRegCommentDots, FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import { requestURL } from "../../requestURL.js";
export default function DiscussionFullView(props) {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  let likes = props.likes;
  const handleLike = () => {
    console.log("handle like");
  };
  const handleComment = () => {
    console.log("handle comment");
  };
  const handleSave = () => {
    console.log("handle save");
  };
  return (
    <div className="w-full max-w-md mx-auto pt-10 mt-5 bg-white shadow-md rounded-md overflow-hidden">
      <div className="flex items-center px-4 py-2 border-b border-gray-200">
        <h2 className="text-lg leading-none font-bold text-gray-800 mr-auto">
          {props.title}
        </h2>
        <div className="flex items-center">
          <img
            src={props.photo}
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="overflow-hidden truncate text-gray-600">
            {props.username}
          </span>
        </div>
      </div>
      <Link to={`/discussion-view/${props.discussionId}`}>
        <div className="p-4">
          <p className="text-gray-700 leading-relaxed text-justify">
            {props.content}
          </p>
        </div>
      </Link>
      <div className="flex flex-row">
        <div className="pt-1 pl-4">
          <p className="font-semibold text-base">{likes} Likes</p>
        </div>
        <div className="justify-self-end"></div>
        <div className="text-right text-base font-normal pl-56 pt-1 mb-3">
          {moment.utc(props.date).format("MM/DD/YY")}
        </div>
      </div>
    </div>
  );
}
