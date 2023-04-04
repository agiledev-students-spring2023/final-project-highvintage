import React, { useState } from "react";
import EditProfile from "../../pages/EditProfile";
import { Link } from "react-router-dom";

/**
 * A React component that represents a user's profile header
 * @returns The contents of this component, in JSX form.
 */
export default function ProfileHeader(props) {
  const {
    isLoggedIn,
    username,
    profilePicture,
    bio,
    style,
    favoriteThrift,
    posts,
    followers,
    following,
    isFollowing,
    handleFollow,
  } = props;

  return (
    <div>
      <div className="flex flex-row items-center space-x-16 mt-12">
        <div className="flex-shrink-0">
          <img
            src={profilePicture}
            alt="profile-picture"
            className="rounded-full object-cover w-40 h-40 ml-8 mt-8"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center mt-4">
            <h2 className="text-2xl font-bold">{username}</h2>
            {isLoggedIn ? (
              <button className="bg-gray-300 text-black px-4 py-2 rounded-lg ml-8">
                <Link to="/edit-profile">Edit Profile</Link>
              </button>
            ) : (
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-lg ml-8"
                onClick={handleFollow}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>

          <ul className="flex flex-row mt-4">
            <li className="mr-6">
              <span className="font-bold">{posts.length}</span> posts
            </li>
            <button>
              <li className="mr-6">
                <Link to="/followers" state={{ currentUser: { username } }}>
                  <span className="font-bold">{followers.length}</span>{" "}
                  followers
                </Link>
              </li>
            </button>
            <button>
              <li className="mr-6">
                <Link to="/following" state={{ currentUser: { username } }}>
                  <span className="font-bold">{following.length}</span>{" "}
                  following
                </Link>
              </li>
            </button>
          </ul>
        </div>
      </div>
      <div className="ml-9">
        <div className="text-gray-500">
          <p className="mt-3">
            <span className="font-semibold">Style:</span> {style}
          </p>
          <p className="">
            <span className="font-semibold">Favorite Thrift:</span>{" "}
            {favoriteThrift}
          </p>
        </div>
        <p className="mt-1">{bio}</p>
      </div>
    </div>
  );
}
