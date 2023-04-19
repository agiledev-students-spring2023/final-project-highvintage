import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfilePreview from "../components/Profile/ProfilePreview";
import GenericHeader from "../components/GenericHeader";
import axios from "axios";
import { requestURL } from "../requestURL";

export default function Followers() {
  const [followers, setFollowers] = useState([]);
  const location = useLocation();
  const { currentUser } = location.state;

  useEffect(() => {
    async function fetchFollowers() {
      try {
        const response = await axios.get(
          requestURL + "users/" + currentUser.username + "/followers"
        );
        setFollowers(response.data.followers);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFollowers();
  }, []);

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
