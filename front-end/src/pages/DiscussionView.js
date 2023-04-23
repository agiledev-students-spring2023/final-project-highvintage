import React, { useState, useEffect, useCallback } from "react";
import GenericHeader from "../components/GenericHeader";
import { FaRegHeart, FaRegCommentDots, FaHeart } from "react-icons/fa";
import { useParams } from "react-router";
import axios from "axios";
import { requestURL } from "../requestURL.js";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DiscussionInteraction from "../components/Discussions/DiscussionInteraction";
export default function DiscussionView() {
  const navigate = useNavigate();
  // const [user, setUser] = useState();
  const params = useParams();
  const [isFetched, setIsFetched] = useState(false);
  const [discussion, setDiscussion] = useState({
    id: "",
    comments: [],
    date: "",
    title: "",
    content: "",
    discussionLike: [],
    author: "",
  });
  //get discussion

  useEffect(() => {
    async function fetchDiscussion(query) {
      const response = await axios.get(
        requestURL + "discussions/view/" + query
      );
      setIsFetched(true);
      return response.data;
    }

    // still needs err handling
    fetchDiscussion(params.id)
      .then((res) => setDiscussion(res))
      .catch((err) => console.log(err));

    return () => {};
  }, []);

  const handleLike = () => {
    console.log("handle like");
  };
  const handleComment = () => {
    console.log("handle comment");
  };
  if (!isFetched) {
    return <div>Loading...</div>;
  }else{
    console.log("discussionfound", discussion.found);
  }
  return (
    <>
      <GenericHeader pageName="View Discussion"></GenericHeader>
      <br></br>
      {/* Currently displaying the first dummy discussion */}
      <div className="w-full max-w-md mx-auto pt-10 mt-5 bg-white shadow-md rounded-md overflow-hidden">
        <div className="flex items-center px-4 py-2 border-b border-gray-200">
          <h2 className="text-lg leading-none font-bold text-gray-800 mr-auto">
            {discussion.found.title}
          </h2>
          <div className="flex items-center">
            <img
              src={discussion.authorPhoto}
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            {/* need link to the profile when click on */}
            <span className="overflow-hidden truncate text-gray-600">
              {discussion.authorUsername}
            </span>
          </div>
        </div>

        <div className="p-4">
          <p className="text-gray-700 leading-relaxed text-justify">
            {discussion.found.content}
          </p>
        </div>

        {/* Using the same code as in interactable buttons, not using the compoenent because "save" button is placed at a different margin*/}
        <div className="flex flex-row ml-1 mb-1">
          <DiscussionInteraction
            authorID={discussion.found.author}
            discussionID={discussion.found._id}
            likes={discussion.found.likes.length}
            comments={discussion.found.comments}
          />
          <div className="justify-self-end ml-20 "></div>
          <div className="text-right text-base font-normal pl-24 mt-4 mb-2">
            {/* Better MM-DD-*/}
            {moment.utc(discussion.found.date).format("MM/DD/YY")}
          </div>
        </div>
      </div>
      {/* comment component goes here */}
    </>
  );
}
