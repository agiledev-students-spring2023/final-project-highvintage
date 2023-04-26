import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [err, setErr] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const nav = useNavigate();

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
    isFollowing: false,
  });
  // fetchMe

  useEffect(() => {
    async function fetchPage() {
      async function fetchMe() {
        try {
          const response = await axios.get(requestURL + "users/me");
          return response.data.user;
        } catch (e) {
          nav("/500");
        }
      }

      async function fetchAnother(cleanUsername) {
        try {
          const response = await axios.get(
            requestURL + "users/profile/" + cleanUsername
          );
          return response.data;
        } catch (e) {
          if (e.response.status === 404) {
            nav("/404");
          } else {
            nav("/500");
          }
        }
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
          isFollowing: false,
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
          isFollowing: other.isFollowing,
        };
        setHeader(userState);
      }

      setLoaded(true);
    }

    try {
      fetchPage();
    } catch (e) {
      console.log("error");
    }
  }, [username]);

  return (
    <>
      {" "}
      <div className="mb-16">
        <GenericHeader pageName="Profile"></GenericHeader>
        {loaded ? (
          <>
            {" "}
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
              isFollowing={header.isFollowing}
            />
            <ProfileShowPosts
              userPosts={header.posts}
              discussions={header.discussion}
              authorPhoto={header.profilePicture}
              authorUsername={header.username}
            ></ProfileShowPosts>
          </>
        ) : (
          <p className="text-gray-500 text-sm text-center mt-24">
            {" "}
            Loading profile...
          </p>
        )}

        <MainNav />
      </div>
    </>
  );
};

export default Profile;
