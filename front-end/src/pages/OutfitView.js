import React, { useEffect, useState } from "react";
import OutfitPost from "../components/OutfitPost/OutfitPost";
import GenericHeader from "../components/GenericHeader";
import { requestURL } from "../requestURL";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OutfitView() {
  // fetch on page load - useEffect
  const params = useParams();
  const [post, setPost] = useState({
    postId: 0,
    date: "",
    postLoc: "",
    postMedia: [],
    postLike: [],
    postText: "",
    comments: [],
    author: "",
  });
  useEffect(() => {
    async function fetchPost(query) {
      const response = await axios.get(requestURL + "posts/view/" + query);
      return response.data;
    }

    fetchPost(params.id).then((res) => setPost(res));

    return () => {};
  }, []);

  return (
    <div>
      <GenericHeader pageName="View Post"></GenericHeader>
      <div className="mt-20">
        <OutfitPost post={post}></OutfitPost>
      </div>
    </div>
  );
}
