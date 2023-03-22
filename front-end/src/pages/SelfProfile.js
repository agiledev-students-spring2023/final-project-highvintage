import React, { useState } from "react";
import ProfileHeader from "../components/Profile/ProfileHeader.js";
import ProfileShowPosts from "../components/Profile/ProfileShowPosts.js";
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
      <ProfileShowPosts></ProfileShowPosts>
      <MainNav></MainNav>
    </div>
  );
};

export default SelfProfile;
