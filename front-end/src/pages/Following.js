import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfilePreview from "../components/Profile/ProfilePreview";
import GenericHeader from "../components/GenericHeader";
import axios from "axios";
import { requestURL } from "../requestURL";

export default function Following() {
  const [following, setFollowing] = useState([]);
  const location = useLocation();
  const { currentUser } = location.state;

  useEffect(() => {
    async function fetchFollowing() {
      try {
        const response = await axios.get(
            requestURL +
            "users/" +
            currentUser.username +
            "/following"
        );
        //const response = await axios.get('${requestURL}api/users/${props.username}/followings');
        setFollowing(response.data.following);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFollowing();
  });

  const followingComponents = following.map((following) => (
    <ProfilePreview username={following.username} photo={following.photo} />
  ));

  return (
    <>
      <GenericHeader pageName="Following" />
      <div className="grid grid-cols-1 mt-12">{followingComponents}</div>{" "}
    </>
  );
}
