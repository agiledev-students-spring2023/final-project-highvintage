import React, { useState } from "react";
import ProfilePreview from "../components/ProfilePreview";
import { dummyUsers } from "../dummy/users";
import GenericHeader from "../components/GenericHeader";

export default function Followers() {
  // mocking an api call to get someone's followers: a list of followers
  // follower objects: {username, photo, userID}
  const [followers, setFollowers] = useState(dummyUsers);

  const followerComponents = followers.map((follower) => (
    <ProfilePreview username={follower.username} photo={follower.photo} />
  ));

  return (
    <>
      <GenericHeader pageName="Followers" />
      <div className="grid grid-cols-1 mt-12">{followerComponents}</div>{" "}
    </>
  );
}
