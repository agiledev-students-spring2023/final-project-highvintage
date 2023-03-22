import React, { useState } from "react";
import DiscussionFullView from "../Saved/DiscussionFullView.js";
import OutfitPreview from "../OutfitPreview.js";
import { dummyUsers } from "../../dummy/users.js";

export default function ProfileShowPosts(props) {
  //set initial tab to outfits
  const [currTab, setCurrTab] = useState("Outfits");

  const tabChange = (tab) => {
    setCurrTab(tab);
  };

  const [users, setUsers] = useState(dummyUsers);

  const OutfitPreviews = users.map((user) => (
    <OutfitPreview
      key={user.id}
      id={user.id}
      photo={user.posts[0].postMedia[0]}
    />
  ));

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
