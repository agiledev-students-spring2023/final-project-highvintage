import React from "react";
import { useState, useEffect } from "react";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import OutfitPost from "../components/OutfitPost/OutfitPost";
import axios from "axios";
import { requestURL } from "../requestURL";

export default function Home() {
  const [viewable, setViewable] = useState([]);
  useEffect(() => {
    async function fetchFeed() {
      const response = await axios.get(requestURL + "posts/feed");
      const results = response.data.map((post) => {
        // each element is a post by a followed user!
        return <OutfitPost post={post} />;
      });

      setViewable(results);
    }

    fetchFeed();

    return () => {};
  }, []);

  return (
    <div>
      <GenericHeader pageName="HighVintage"></GenericHeader>
      <div className="mt-20 mb-20 flex flex-col justify-center items-center space-y-4"></div>
      {viewable}
      <MainNav />
    </div>
  );
}
