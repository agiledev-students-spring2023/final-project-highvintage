import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileHeader from "../components/Profile/ProfileHeader.js";
import ProfileShowPosts from "../components/Profile/ProfileShowPosts.js";
import GenericHeader from "../components/GenericHeader.js";
import MainNav from "../components/MainNav.js";

/**
 * A React component that represents a user's profile page
 * NOTE: currently filled with placeholders for user information
 * @returns The contents of this component, in JSX form.
 */
const Profile = () => {
  const [header, setHeader] = useState([
    {
      isSelf: false,
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

  return (
    <div className="mb-16">
      <GenericHeader pageName="Profile"></GenericHeader>
      {headerComp}
      <ProfileShowPosts></ProfileShowPosts>
      <MainNav></MainNav>

    </div>
  );
};

export default Profile;
