import React, { useState } from "react";
import ProfilePreview from "../components/ProfilePreview";

export default function Followers() {
  // mocking an api call to get someone's followers: a list of followers
  // follower objects: {username, photo, userID}
  const [followers, setFollowers] = useState([
    {
      username: "johngreen",
      photo:
        "https://images.unsplash.com/photo-1627161683077-e34782c24d81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1406&q=80",
    },
    {
      username: "thriftlover",
      photo:
        "https://images.unsplash.com/photo-1630208232589-e42b29428b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1538&q=80",
    },
    {
      username: "franz20494",
      photo:
        "https://images.unsplash.com/photo-1622842182823-28bfbfba47e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60",
    },
    {
      username: "john_doe",
      photo:
        "https://images.unsplash.com/photo-1598207951491-255eaf139751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60",
    },
  ]);

  const followerComponents = followers.map((follower) => (
    <ProfilePreview username={follower.username} photo={follower.photo} />
  ));

  return (
    <>
      <h1 className="p-4 text-center text-2xl font-extrabold"> Followers</h1>
      <div className="grid grid-cols-1">{followerComponents}</div>{" "}
    </>
  );
}
