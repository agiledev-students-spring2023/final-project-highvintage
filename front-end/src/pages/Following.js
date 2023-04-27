import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfilePreview from "../components/Profile/ProfilePreview";
import GenericHeader from "../components/GenericHeader";
import axios from "axios";
import { requestURL } from "../requestURL";
import Loading from "../components/Loading";

export default function Following() {
  const [following, setFollowing] = useState([]);
  const location = useLocation();
  const { currentUser } = location.state;

  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchFollowing() {
      try {
        const response = await axios.get(
          requestURL + "users/" + currentUser.username + "/following"
        );
        //const response = await axios.get('${requestURL}api/users/${props.username}/followings');
        setFollowing(response.data.following);
      } catch (error) {
        setErr(true);
      }
    }

    try {
      fetchFollowing();
      setLoaded(true);
    } catch (err) {
      setErr(true);
    }
  }, []);

  const followingComponents = following.map((following) => (
    <ProfilePreview username={following.username} photo={following.photo} />
  ));

  function loadPage() {
    if (!loaded) {
      <Loading />;
    }
    if (loaded && !err) {
      if (following.length <= 0) {
        return (
          <p className="mt-24 text-center text-lg">
            {" "}
            Looks like you don't have any followers, yet!{" "}
          </p>
        );
      }
      return (
        <div className="grid grid-cols-1 mt-12">{followingComponents}</div>
      );
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
      <GenericHeader pageName="Following" />
      {loadPage()}
    </>
  );
}
