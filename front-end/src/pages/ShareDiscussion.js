import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MainNav from "../components/MainNav";
import DiscussionFullView from "../components/Discussions/DiscussionFullView";
import DropDownMenuTwo from "../components/Discussions/DropDownSort";
import axios from "axios";
import { requestURL } from "../requestURL.js";

// const { ObjectId } = require("mongodb");
export default function ShareDiscussion() {
  const navigate = useNavigate();
  const [sortedDiscussions, setSortedDiscussions] = useState([]);
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState("");
  const [discussions, setDiscussions] = useState([]);
  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const response = await axios.get(requestURL + "allDiscussions");
        // console.log(response.data);
        setDiscussions(response.data);
        setSortedDiscussions(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    async function fetchMe() {
      const response = await axios.get(requestURL + "users/me");
      setMe(response.data.user.username);
    }

    fetchDiscussion();
    fetchMe();
  }, []);

  const sortByMostRecent = () => {
    const sorted = [...discussions].sort((a, b) =>
      a.date < b.date ? 1 : -1
    );
    setSortedDiscussions(sorted);
  };

  const sortByMostPopular = () => {
    const sorted = [...discussions].sort((a, b) =>
      a.likes.length <
      b.likes.length
        ? 1
        : -1
    );
    setSortedDiscussions(sorted);
  };

  const discussionComponents = sortedDiscussions.map((discussion) => (
    <DiscussionFullView
      key={discussion._id}
      discussionId={discussion._id}
      title={discussion.title}
      // photo={user.photo}
      content={discussion.content}
      userID={discussion.author}
      date={discussion.posted}
      likes={discussion.likes.length}
      username = {me}
    ></DiscussionFullView>
  ));

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row -mb-7 mt-8">
          <div className="relative h-32 w-32">
            <div className="absolute ml-5 py-1 left-0 top-0 h-20 w-24 border-4 rounded-lg">
              <img
                src="https://ventureasheville.com/wp-content/uploads/2015/09/logo-placeholder.jpg"
                alt="logo"
              ></img>
            </div>
          </div>

          <div className="relative ml-10 mr-5 w-4/5 ">
            <Link to="/search">
              <button className="h-20 rounded-lg w-full p-4 text-gray-900 bg-gray-200 dark:bg-gray-600 dark:text-white">
                Search HighVintage
              </button>
            </Link>
          </div>
        </div>
        <hr className="w-full h-0 border-none pt-1 mb-4  bg-gray-700 border-0"></hr>
      </div>

      <DropDownMenuTwo
        menuName="Sort By"
        optionOne="Most Recent"
        optionTwo="Most Popular"
        handleOptionOneClick={sortByMostRecent}
        handleOptionTwoClick={sortByMostPopular}
      ></DropDownMenuTwo>

      <br></br>
      <div className="grid grid-cols-1 gap-3 px-3 my-1 mt-2 mb-24 z-10 ">
        {/* Only links to one demo discussion page */}

        {discussionComponents}
      </div>
      <div className="flex flex-col">
        <button
          onClick={() => navigate("/discussion-form")}
          className="fixed bottom-4 left-0 mb-8 w-full text-l font-bold bg-gray-500 text-white py-3"
        >
          Post
        </button>
        <MainNav linkToMe={me} />
      </div>
    </>
  );
}
