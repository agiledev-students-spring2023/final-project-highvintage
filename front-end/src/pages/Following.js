import React from "react";
import ProfilePreview from "../components/ProfilePreview";
import { useState } from "react";
import { dummyUsers } from "../dummy/users";
import GenericHeader from "../components/GenericHeader";

export default function Following() {
  // this page uses a different API call to get user's list of following
  // thats why i made it a seperate page
  const [followers, setFollowers] = useState(dummyUsers);

  const followerComponents = followers.map((follower) => (
    <ProfilePreview username={follower.username} photo={follower.photo} />
  ));
  return (
    <>
      <GenericHeader pageName="Following" />
      <div className="grid grid-cols-1 mt-12">{followerComponents}</div>{" "}
    </>
  );
}
