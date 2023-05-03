import React, { useState, useEffect } from "react";
import GenericHeader from "../components/GenericHeader";
import Loading from "../components/Loading";

import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { requestURL } from "../requestURL.js";
import config from "../token";
import { Link } from "react-router-dom";

import moment from "moment";
import DiscussionInteraction from "../components/Discussions/DiscussionInteraction";
export default function DiscussionView() {
  const params = useParams();
  const navigate = useNavigate();
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

  const photo = discussion.authorPhoto || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  useEffect(() => {
    async function fetchDiscussion(query) {
      try {
        const response = await axios.get(
          requestURL + "discussions/view/" + query, config
        );
        if (response.data.found) {
          setIsFetched(true);
          setDiscussion(response.data);
        } else {
          navigate("/404");
        }
      } catch (error) {
        navigate("/404");
      }
    }

    fetchDiscussion(params.id)
      .then((res) => {
        if (!res.found) {
          navigate("/404");
        }
      })
      .catch((err) => console.log(err));

    return () => {};
  }, [params.id, navigate]);

  if (!isFetched) {
    return  <Loading/>
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
              src={photo}
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
          <Link
            to={`/profile/${discussion.authorUsername}`}
            className="overflow-hidden truncate text-gray-600"
          >
            {discussion.authorUsername}
          </Link>
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
    </>
  );
}
