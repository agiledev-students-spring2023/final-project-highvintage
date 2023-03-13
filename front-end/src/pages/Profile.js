import React, { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import ProfileHeader from "../components/ProfileHeader.js";

/**
 * A React component that represents a user's profile page
 * NOTE: currently filled with placeholders for user information
 * @returns The contents of this component, in JSX form.
 */
const Profile = () => {
  const [header, setHeader] = useState([
    {
      username: "lisa_li",
      profilePicture:
        "https://images.unsplash.com/photo-1541823709867-1b206113eafd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      style: "Streetwear",
      favoriteThrift: "Urban Jungle",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      followers: "623",
      following: "302",
      posts: "67",
    },
  ]);

  const headerComp = header.map((header) => (
    <ProfileHeader
      username={header.username}
      profilePicture={header.profilePicture}
      style={header.style}
      favoriteThrift={header.favoriteThrift}
      bio={header.bio}
      followers={header.followers}
      following={header.following}
      posts={header.posts}
    />
  ));

  return (
    <div>
      <div className="top-0 left-0 right-0 grid w-80 grid-cols-2 p-3">
        <FaLongArrowAltLeft />
      </div>
      <h1 className="text-center text-2xl font-extrabold -mt-5">Profile</h1>
      <div className="-mt-4">{headerComp}</div>

      <ul class="mt-4 font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadowdark:divide-gray-700 dark:text-gray-400">
        <li class="w-full">
          <a
            class="inline-block w-full p-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-white"
          >
            Outfits
          </a>
        </li>
        <li class="w-full">
          <a
            class="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            Discussion Posts
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
