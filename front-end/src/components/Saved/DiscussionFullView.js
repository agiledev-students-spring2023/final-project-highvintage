import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaRegCommentDots, FaRegBookmark } from "react-icons/fa";
export default function DiscussionFullView(props) {
  const navigate = useNavigate();

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
          {/* need link to the profile when click on */}
          <span className="overflow-hidden truncate text-gray-600">
            {props.username}
          </span>
        </div>
      </div>
      <Link
        to={`/discussion-view/users/${props.username}/discussions/${props.discussionId}`}
      >
        <div className="p-4">
          <p className="text-gray-700 leading-relaxed text-justify">
            {props.content}
          </p>
        </div>
      </Link>

      {/* Using the same code as in interactable buttons, not using the compoenent because "save" button is placed at a different margin*/}
      <div className="flex flex-row ml-1 mb-1">
        <div className="grid grid-cols-2 px-2">
          <div className="flex space-x-2">
            {/* Like */}
            <div className="my-auto" onClick={handleLike}>
              <FaRegHeart size={25} />
            </div>

            {/* Comment */}
            <div className="my-auto" onClick={handleComment}>
              <FaRegCommentDots
                size={24}
                onClick={() => navigate("/comments")}
              />
            </div>
          </div>

          <div className="my-auto ml-4" onClick={handleSave}>
            {/* Save */}
            <FaRegBookmark size={24} />
          </div>
        </div>

        <div className="justify-self-end ml-10 "></div>
        <div className="text-right text-xs font-normal ml-28 mt-4 mb-2">
          {props.date.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
