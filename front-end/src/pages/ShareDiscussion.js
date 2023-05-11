import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNav from "../components/MainNav";
import GenericHeader from "../components/GenericHeader.js";
import DiscussionFullView from "../components/Discussions/DiscussionFullView";
import DropDownMenuTwo from "../components/Discussions/DropDownSort";
import Loading from "../components/Loading";
import axios from "axios";
import { requestURL } from "../requestURL.js";
import config
 from "../token";
export default function ShareDiscussion() {
  const navigate = useNavigate();
  const [sortedDiscussions, setSortedDiscussions] = useState([]);
  const [me, setMe] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const response = await axios.get(requestURL + "allDiscussions", config);
        setDiscussions(response.data);
        setSortedDiscussions(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        navigate("/500");
      }
    };

    async function fetchMe() {
      try {
        const response = await axios.get(requestURL + "users/me", config);
        setMe(response.data.user);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching me:", error);
        navigate("/500");
      }
    }

    fetchDiscussion();
    fetchMe();
  }, [navigate]);

  const sortByMostRecent = () => {
    const sorted = [...discussions].sort((a, b) => (a.date < b.date ? 1 : -1));
    setSortedDiscussions(sorted);
  };

  const sortByMostPopular = () => {
    const sorted = [...discussions].sort((a, b) =>
      a.likes.length < b.likes.length ? 1 : -1
    );
    setSortedDiscussions(sorted);
  };

  const discussionComponents = sortedDiscussions.map((discussion) => (
    <DiscussionFullView
      key={discussion._id}
      discussionId={discussion._id}
      title={discussion.title}
      photo={discussion.author.photo}
      content={discussion.content}
      userID={discussion.author}
      date={discussion.posted}
      likes={discussion.likes.length}
      username={discussion.author.username}
    ></DiscussionFullView>
  ));

  return (
    <>
      <GenericHeader pageName="Discuss"></GenericHeader>
      {loaded ? (
        <>
          <div className="flex flex-col">
            <div className="mt-16">
              <DropDownMenuTwo
                menuName="Sort By"
                optionOne="Most Recent"
                optionTwo="Most Popular"
                handleOptionOneClick={sortByMostRecent}
                handleOptionTwoClick={sortByMostPopular}
              ></DropDownMenuTwo>
            </div>
          </div>

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
          </div>
        </>
      ) : (
        <Loading />
      )}
      <MainNav linkToMe={me} />
    </>
  );
}
