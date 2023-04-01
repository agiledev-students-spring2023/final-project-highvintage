import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MainNav from "../components/MainNav";
import DiscussionFullView from "../components/Saved/DiscussionFullView";
import DropDownMenuTwo from "../components/ShareDiscussion/DropDownSort";
import axios from "axios";
import { requestURL } from "../requestURL.js";
export default function ShareDiscussion() {

  const navigate = useNavigate();
  //only using the first two dummy users since I did not put discussion posts in others
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(requestURL + 'dummyUsers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);
  const discussionComponents = users.map((user) => (
    <DiscussionFullView
      key={user.id}
      title={user.discussion[0].title}
      photo={user.photo}
      content={user.discussion[0].content}
      username={user.username}
      date={user.discussion[0].date}
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
      ></DropDownMenuTwo>

      <br></br>
      <div className="grid grid-cols-1 gap-3 px-3 my-1 mt-2 mb-24 z-10 ">
        {/* Only links to one demo discussion page */}
        {discussionComponents}
      </div>
      <div className="flex flex-col">
        <button
          onClick={() => navigate("/discussion-form")}
          className="fixed bottom-4 left-0 mb-10 w-full text-l font-bold bg-gray-500 text-white py-3"
        >
          Post
        </button>
        <MainNav></MainNav>
      </div>
    </>
  );
}
