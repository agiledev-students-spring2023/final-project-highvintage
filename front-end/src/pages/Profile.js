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
  const [isFollowing, setIsFollowing] = useState();
  const [loggedInUser, setLoggedInUser] = useState(null);

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
  });

  async function followUser(username) {
    axios.put(requestURL + 'users/' + username + '/follow')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  async function unfollowUser(username) {
    axios.put(requestURL + 'users/' + username + '/unfollow')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const handleFollow = async () => {
    try {
      let updatedHeader = { ...header };
      if (isFollowing) {
        await unfollowUser(header.username);
        updatedHeader.followers = updatedHeader.followers.filter((id) => id !== header.id);
      } else {
        await followUser(header.username);
        updatedHeader.followers = [...updatedHeader.followers, header.id];
      }
      console.log(updatedHeader);
      setIsFollowing(!isFollowing);
      setHeader(updatedHeader);
    } catch (error) {
      console.error("Error trying to follow/unfollow:", error.message);
    }
  };

  async function fetchLoggedInUser() {
    const response = await axios.get(requestURL + "users/me");
    return response.data.user;
  }

  async function fetchProfile(query) {
    const response = await axios.get(
      requestURL + "users/profile?username=" + query
    );
    const fetchedProfile = response.data.user;

    if (loggedInUser && loggedInUser.username === fetchedProfile.username) {
      fetchedProfile.isLoggedIn = true;
    } else {
      fetchedProfile.isLoggedIn = false;
    }

    setHeader(fetchedProfile);
  }


  useEffect(() => {
    async function fetchAndSetLoggedInUser() {
      const user = await fetchLoggedInUser();
      setLoggedInUser(user);
    }
    fetchAndSetLoggedInUser();
  }, []);

  useEffect(() => {
    setIsFollowing(header.followers.includes(header.id));
  }, [header]);

  useEffect(() => {
    if (loggedInUser) {
      fetchProfile(username.username.toLowerCase());
    }
  }, [loggedInUser]);


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
        isFollowing = {isFollowing}
        handleFollow={handleFollow}
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
