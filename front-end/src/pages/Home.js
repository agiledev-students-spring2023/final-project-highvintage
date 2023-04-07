import React from "react";
import { useState, useEffect } from "react";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import OutfitPost from "../components/OutfitPost/OutfitPost";
import axios from "axios";
import { requestURL } from "../requestURL";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const [viewable, setViewable] = useState([]);
  const [me, setMe] = useState("");

  useEffect(() => {
    async function fetchFeed() {
      const response = await axios.get(requestURL + "posts/feed");
      const results = response.data.map((post) => {
        // each element is a post by a followed user!
        return <OutfitPost post={post} />;
      });

      async function fetchMe() {
        const response = await axios.get(requestURL + "users/me");
        setMe(response.data.user.username);
      }

      setViewable(results);
      fetchMe();
    }

    fetchFeed();

    return () => {};
  }, []);

  return (
    <div>
      <GenericHeader pageName="HighVintage"></GenericHeader>
      <div className="mt-14 flex flex-col justify-center items-center space-y-4"></div>
      {viewable}
      <div className="mt-14">
        <MainNav linkToMe={me} />
      </div>
    </div>
  );
}
