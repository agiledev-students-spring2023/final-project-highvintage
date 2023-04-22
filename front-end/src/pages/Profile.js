import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/Profile/ProfileHeader.js";
import ProfileShowPosts from "../components/Profile/ProfileShowPosts.js";
import GenericHeader from "../components/GenericHeader.js";
import MainNav from "../components/MainNav.js";
import axios from "axios";
import { requestURL } from "../requestURL.js";

const Profile = () => {
  const username = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [me, setMe] = useState("");
  const [isMyProfile, setIsMyProfile] = useState(false);

  const [header, setHeader] = useState({
    username: "",
    profilePicture: "",
    style: "",
    favoriteThrift: "",
    bio: "",
    followers: [],
    following: [],
    discussion: [],
    posts: [],
    isLoggedIn: false,
  });

  // fetchMe

  useEffect(() => {
    async function fetchPage() {
      async function fetchMe() {
        const response = await axios.get(requestURL + "users/me");
        return response.data.user;
      }

      async function fetchAnother(cleanUsername) {
        const response = await axios.get(
          requestURL + "users/profile/" + cleanUsername
        );
        return response.data;
      }
      const cleanUsername = username.username.toLowerCase();
      const myProfile = await fetchMe();
      setMe(myProfile.username);

      const isDoneFetching = myProfile.username === cleanUsername;

      if (isDoneFetching) {
        // cleaning response to fit state
        const userState = {
          username: myProfile.username,
          profilePicture: myProfile.photo
            ? myProfile.photo
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          style: myProfile.style,
          favoriteThrift: myProfile.favThrift,
          bio: myProfile.bio,
          followers: myProfile.followers,
          following: myProfile.following,
          discussion: myProfile.discussions,
          posts: myProfile.posts,
          isLoggedIn: true,
        };
        setHeader(userState);
      } else {
        const other = await fetchAnother(cleanUsername);
        const otherProfile = other.user;
        const userState = {
          username: otherProfile.username,
          profilePicture: otherProfile.photo
            ? otherProfile.photo
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          style: otherProfile.style,
          favoriteThrift: otherProfile.favThrift,
          bio: otherProfile.bio,
          followers: otherProfile.followers,
          following: otherProfile.following,
          discussion: otherProfile.discussions,
          posts: otherProfile.posts,
          isLoggedIn: false,
        };
        setHeader(userState);
      }
    }

    fetchPage();
  }, [username]);

  return (
    <div className="mb-16">
      <GenericHeader pageName="Profile"></GenericHeader>
      <ProfileHeader
        isLoggedIn={header.isLoggedIn}
        username={header.username}
        profilePicture={header.profilePicture}
        style={header.style}
        favoriteThrift={header.favoriteThrift}
        bio={header.bio}
        followers={header.followers}
        following={header.following}
        posts={header.posts}
        discussions={header.discussion}
        isFollowing={isFollowing}
        // handleFollow
      />
      <ProfileShowPosts
        userPosts={header.posts}
        discussions={header.discussion}
        authorPhoto={header.profilePicture}
        authorUsername={header.username}
      ></ProfileShowPosts>
      <MainNav linkToMe={me} />
    </div>
  );
};

export default Profile;
