import React from "react";

/**
 * A React component that represents a user's profile header
 * @returns The contents of this component, in JSX form.
 */
export default function ProfileHeader(props) {
  const {
    username,
    profilePicture,
    bio,
    style,
    favoriteThrift,
    posts,
    followers,
    following,
  } = props;
  return (
    <div>
      <div className="flex flex-row items-center space-x-16">
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
            <button className="bg-gray-300 text-black px-4 py-2 rounded-lg ml-8">
              Follow
            </button>
          </div>
          <ul className="flex flex-row mt-4">
            <li className="mr-6">
              <span className="font-bold">{posts}</span> posts
            </li>
            <li className="mr-6">
              <span className="font-bold">{followers}</span> followers
            </li>
            <li>
              <span className="font-bold">{following}</span> following
            </li>
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
