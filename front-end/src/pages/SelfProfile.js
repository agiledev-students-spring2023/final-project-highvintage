import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader.js";
import OutfitPreview from "../components/OutfitPreview.js";
import GenericHeader from "../components/GenericHeader.js";
import { dummyUsers } from "../dummy/users";
import MainNav from "../components/MainNav.js";

/**
 * A React component that represents a user's own profile page
 * NOTE: currently filled with placeholders for user information
 * @returns The contents of this component, in JSX form.
 */
const SelfProfile = () => {
  const [header, setHeader] = useState([
    {
      isSelf: true,
      username: "suzii",
      profilePicture:
        "https://images.unsplash.com/photo-1660951381925-57ac7e40c40d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
      style: "Streetwear",
      favoriteThrift: "Urban Jungle",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      followers: "509",
      following: "264",
      posts: "63",
    },
  ]);

  const headerComp = header.map((header) => (
    <ProfileHeader
      isSelf={header.isSelf}
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

  const [users, setUsers] = useState(dummyUsers);

  const OutfitPreviews = users.map((user) => (
    <OutfitPreview
      key={user.id}
      id={user.id}
      photo={user.posts[0].postMedia[0]}
    />
  ));

  return (
    <div className="mb-16">
      <GenericHeader pageName="Profile"></GenericHeader>

      {headerComp}

      {/*Outfit posts / Discussion bar */}
      <ul class="flex flex-row mt-4 font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadowdark:divide-gray-700 dark:text-gray-400">
        <li class="flex-1">
          <button class="inline-block w-full p-4 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-white">
            Outfits
          </button>
        </li>
        <li class="flex-1">
          <button class="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
            Discussion Posts
          </button>
        </li>
      </ul>

      {/* outfit grid */}
      <div className="grid grid-cols-3 gap-1">{OutfitPreviews}</div>
      <MainNav></MainNav>
    </div>
  );
};

export default SelfProfile;
