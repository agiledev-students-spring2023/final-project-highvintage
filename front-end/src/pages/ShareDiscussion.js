import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MainNav from "../components/MainNav";
import DiscussionFullView from "../components/Discussions/DiscussionFullView";
import DropDownMenuTwo from "../components/Discussions/DropDownSort";
import axios from "axios";
import { requestURL } from "../requestURL.js";
export default function ShareDiscussion() {
  const navigate = useNavigate();
  const [sortedDiscussions, setSortedDiscussions] = useState([]);
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(requestURL + "dummyUsers");
        // console.log(response.data);
        setUsers(response.data);
        setSortedDiscussions(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    async function fetchMe() {
      const response = await axios.get(requestURL + "users/me");
      setMe(response.data.user.username);
    }

    fetchData();
    fetchMe();
  }, []);

  const sortByMostRecent = () => {
    const sorted = [...users].sort((a, b) =>
      a.discussion[0].date < b.discussion[0].date ? 1 : -1
    );
    setSortedDiscussions(sorted);
  };

  const sortByMostPopular = () => {
    const sorted = [...users].sort((a, b) =>
      a.discussion[0].discussionLike.length <
      b.discussion[0].discussionLike.length
        ? 1
        : -1
    );
    setSortedDiscussions(sorted);
  };

  const discussionComponents = sortedDiscussions.map((user) => (
    <DiscussionFullView
      key={user.id}
      id={user.id}
      discussionId={user.discussion[0].id}
      title={user.discussion[0].title}
      photo={user.photo}
      content={user.discussion[0].content}
      username={user.username}
      date={user.discussion[0].date}
      likes={user.discussion[0].discussionLike.length}
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
