import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { requestURL } from "../../requestURL";
import config from "../../token";
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
  } = props;

  console.log(config)
  const nav = useNavigate();
  async function handleFollow() {
    try {
      await axios.post(
        requestURL + "users/" + props.username + "/follow", {}, config,
      );
      nav(0);
    } catch (e) {
      // error
      nav("/500");
    }

  }

  async function handleUnfollow() {
    try {
      await axios.post(
        requestURL + "users/" + props.username + "/unfollow", {}, config
      );
    } catch (e) {
      nav("/500");
    }


    nav(0);
  }

  return (
    <div>
      <div className="flex flex-row items-center mt-20 ml-6 mr-6">
        <div className="flex-shrink-0">
          <img
            src={profilePicture}
            alt="profile-pic"
            className="rounded-full object-cover w-24 h-24"
          />
        </div>
        <div className="flex flex-col ml-8 w-full">
          <h2 className="text-2xl ">{username}</h2>
          <div className="flex flex-col mt-2">
            {isLoggedIn ? (
              <div>
                <button className="bg-blue-200 text-black w-full px-4 py-1 rounded-lg mr-4 ">
                  <Link to="/edit-profile">Edit Profile</Link>
                </button>

                <button className="bg-gray-300 mt-2 text-black w-full px-4 py-1 rounded-lg mr-4 ">
                  <Link to="/"> Log out </Link>
                </button>
              </div>
            ) : (
              <button
                className={`bg-gray-300 text-black w-full px-4 py-1.5 rounded-lg mr-4 ${isFollowing ? "bg-gray-400" : ""
                  } text-sm`}
                onClick={isFollowing ? handleUnfollow : handleFollow}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="ml-6 mr-8">
        <div className="text-gray-500">
          <p className="mt-3">
            <span className="font-semibold">Style:</span> {style === "" ? "Not shared...yet!" : style}
          </p>
          <p className="">
            <span className="font-semibold">Favorite Thrift:</span>{" "}
            {favoriteThrift === "" ? "Not shared...yet!" : favoriteThrift}
          </p>
        </div>
        <p className="mt-1">{bio === "" ? "I love clothes!" : bio}</p>
      </div>

      <ul className="flex justify-center w-full mt-3 border-b-2 bg-white border-x-slate-400">
        <li className="flex flex-col items-center flex-1 py-2">
          <span className="leading-tight font-bold">{posts.length}</span>
          <span className="text-gray-500">{`post${posts.length !== 1 ? "s" : ""
            }`}</span>
        </li>
        <li className="flex flex-col items-center flex-1 py-2">
          <span className="leading-tight font-bold">{followers.length}</span>
          <button className="mx-auto">
            <Link
              to="/followers"
              state={{ currentUser: { username } }}
              className="text-gray-500"
            >
              followers
            </Link>
          </button>
        </li>
        <li className="flex flex-col items-center flex-1 py-2">
          <span className=" leading-tight font-bold">{following.length}</span>
          <button className="mx-auto">
            <Link
              to="/following"
              state={{ currentUser: { username } }}
              className="text-gray-500"
            >
              following
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
}
