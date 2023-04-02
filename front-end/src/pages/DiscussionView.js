import React, { useState, useEffect } from "react";
import GenericHeader from "../components/GenericHeader";
import { FaRegHeart, FaRegCommentDots, FaRegBookmark } from "react-icons/fa";
import { useParams } from "react-router";
import axios from "axios";
import { requestURL } from "../requestURL.js";
import { useNavigate } from "react-router-dom";
import moment from "moment";
export default function DiscussionView() {
  const navigate = useNavigate();
  // const [user, setUser] = useState();
  const { username, discussionId } = useParams();
  const [loading, setLoading] = useState(true);
  // const [discussion, setDiscussion] = useState(null);
  //set discussion
  // useEffect(() => {
  //   const fetchDiscussion = async () => {
  //     try {
  //       const res = await axios.get(
  //         requestURL + `users/${username}/discussions/${discussionId}`
  //       );
  //       console.log(res.data);
  //       setDiscussion(res.data);
  //       if(res.data == null){
  //         console.error('error null', 404 );
  //       }
  //     } catch (err) {
  //       console.error(err.response.data);
  //     }
  //   };

  //   fetchDiscussion();
  // }, [username, discussionId]);
  const [header, setHeader] = useState({
    isSelf: false,
    username: "",
    profilePicture: "",
    style: "",
    favoriteThrift: "",
    bio: "",
    followers: [],
    following: [],
    discussion: [],
    posts: [],
  });
  //get user
  useEffect(() => {
    async function fetchProfile(query) {
      try {
        let response = await axios.get(requestURL + "users/" + query);
        setHeader(response.data.user);
        console.log(response.data.user);
      } catch (err) {
        console.error(err.response.data);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile(username.toLowerCase());

    return () => {};
  }, []);

  const handleLike = () => {
    console.log("handle like");
  };
  const handleComment = () => {
    console.log("handle comment");
  };
  const handleSave = () => {
    console.log("handle save");
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <GenericHeader pageName="View Discussion"></GenericHeader>
      <br></br>
      {/* Currently displaying the first dummy discussion */}
      <div className="w-full max-w-md mx-auto pt-10 mt-5 bg-white shadow-md rounded-md overflow-hidden">
        <div className="flex items-center px-4 py-2 border-b border-gray-200">
          <h2 className="text-lg leading-none font-bold text-gray-800 mr-auto">
            {header.discussion[0].title}
          </h2>
          <div className="flex items-center">
            <img
              src={header.profilePicture}
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            {/* need link to the profile when click on */}
            <span className="overflow-hidden truncate text-gray-600">
              {header.username}
            </span>
          </div>
        </div>

        <div className="p-4">
          <p className="text-gray-700 leading-relaxed text-justify">
            {header.discussion[0].content}
          </p>
        </div>

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
            {moment.utc(header.discussion[0].date).format('MM/DD/YY')}
          </div>
        </div>
      </div>
      ); {/* comment component goes here */}
    </>
  );
}
