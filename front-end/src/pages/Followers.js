import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfilePreview from "../components/Profile/ProfilePreview";
import GenericHeader from "../components/GenericHeader";
import axios from "axios";
import { requestURL } from "../requestURL";
import Loading from "../components/Loading";
import config from "../token";

export default function Followers() {
  const [followers, setFollowers] = useState([]);
  const location = useLocation();
  const { currentUser } = location.state;
  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchFollowers() {
      try {
        const response = await axios.get(
          requestURL + "users/" + currentUser.username + "/followers", config
        );
        setFollowers(response.data.followers);
        setLoaded(true);
      } catch (error) {
        setErr(true);
      }
    }
    try {
      fetchFollowers();
    } catch (e) {
      setErr(true);
    }
  });

  const followerComponents = followers.map((follower) => (
    <ProfilePreview username={follower.username} photo={follower.photo} />
  ));

  function loadPage() {
    if (!loaded) {
      <Loading />;
    }
    if (loaded && !err) {
      if (followers.length <= 0) {
        return (
          <p className="mt-24 text-center text-lg">
            {" "}
            Looks like you don't have any followers, yet!{" "}
          </p>
        );
      }
      return <div className="grid grid-cols-1 mt-12">{followerComponents}</div>;
    }

    if (err) {
      return (
        <p className="mt-24 text-center text-lg">
          {" "}
          Something went wrong loading this page.
        </p>
      );
    }
  }

  return (
    <>
      <GenericHeader pageName="Followers" />
      {loadPage()}
    </>
  );
}
