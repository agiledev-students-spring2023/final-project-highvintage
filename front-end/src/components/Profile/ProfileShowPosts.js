import React, { useState } from "react";
import DiscussionFullView from "../Discussions/DiscussionFullView.js";
import OutfitPreview from "../OutfitPost/OutfitPreview.js";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileShowPosts(props) {
  //set initial tab to outfits
  const [currTab, setCurrTab] = useState("Outfits");

  const tabChange = (tab) => {
    setCurrTab(tab);
  };

  const [discussions, setDiscussions] = useState(props.discussions);

  const OutfitPreviews = props.userPosts.map((post) => (
    <OutfitPreview key={post.postID} id={post.postId} photo={post.postMedia} />
  ));

  const discussionComponents = props.discussions.map((discussion) => (
    <DiscussionFullView
      key={discussion._id}
      discussionId={discussion._id}
      title={discussion.title}
      // photo={props.authorPhoto}
      content={discussion.content}
      username={props.authorUsername}
      date={discussion.posted}
      likes = {discussion.likes.length}
    ></DiscussionFullView>
  ));

  return (
    <div>
      <ul className="flex flex-row mt-4 mb-1 font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadowdark:divide-gray-700 dark:text-gray-400">
        <li className="flex-1">
          <button
            className={`inline-block w-full p-4 ${
              currTab === "Outfits"
                ? "text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-white"
                : "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
            onClick={() => tabChange("Outfits")}
          >
            Outfits
          </button>
        </li>
        <li className="flex-1">
          <button
            className={`inline-block w-full p-4 ${
              currTab === "Discussion Posts"
                ? "text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-white"
                : "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
            onClick={() => tabChange("Discussion Posts")}
          >
            Discussion Posts
          </button>
        </li>
      </ul>
      {/* render components */}
      {currTab === "Outfits" ? (
        <div className="grid grid-cols-3 gap-1">{OutfitPreviews}</div>
      ) : (
        discussionComponents
      )}
    </div>
  );
}
