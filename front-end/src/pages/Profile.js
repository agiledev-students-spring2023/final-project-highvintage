import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProfileHeader from "../components/Profile/ProfileHeader.js";
import ProfileShowPosts from "../components/Profile/ProfileShowPosts.js";
import GenericHeader from "../components/GenericHeader.js";
import MainNav from "../components/MainNav.js";
import axios from "axios";
import { requestURL } from "../requestURL.js";

/**
 * A React component that represents a user's profile page
 * NOTE: currently filled with placeholders for user information
 * @returns The contents of this component, in JSX form.
 */
const Profile = () => {
  const username = useParams();

  const [header, setHeader] = useState({
    isSelf: false,
    username: "",
    profilePicture: "",
    style: "",
    favoriteThrift: "",
    bio: "",
    followers: [],
    following: [],
    discussion: [],
    posts: [],
  });

  // fetch the profile on page render, using useEffect
  useEffect(() => {
    async function fetchProfile(query) {
      const response = await axios.get(requestURL + "users/" + query);
      setHeader(response.data.user);
    }

    fetchProfile(username.username.toLowerCase());

    return () => {};
  }, []);

  return (
    <div className="mb-16">
      <GenericHeader pageName="Profile"></GenericHeader>
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
        discussions={header.discussion}
      />
      <ProfileShowPosts
        userPosts={header.posts}
        discussions={header.discussion}
        authorPhoto={header.profilePicture}
        authorUsername={header.username}
      ></ProfileShowPosts>
      <MainNav></MainNav>
    </div>
  );
};

export default Profile;
