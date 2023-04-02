import React, { useEffect, useState } from "react";
import OutfitPost from "../components/OutfitPost/OutfitPost";
import GenericHeader from "../components/GenericHeader";
import { requestURL } from "../requestURL";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OutfitView() {
  // fetch on page load - useEffect
  const params = useParams();

  const [isFetched, setIsFetched] = useState(false);

  // this matches the response with all of the same properties!
  const [post, setPost] = useState({
    postId: 0,
    date: "",
    postLoc: "",
    postMedia: [],
    postLike: [],
    postText: "",
    comments: [],
    author: 0,
    authorPhoto: "",
    authorUsername: "",
  });
  useEffect(() => {
    async function fetchPost(query) {
      const response = await axios.get(requestURL + "posts/view/" + query);
      setPost(response.data.post);
      setIsFetched(true);
      return response.data;
    }

    // still needs err handling
    fetchPost(params.id);

    return () => {};
  }, []);

  return (
    <div>
      <GenericHeader pageName="View Post"></GenericHeader>
      <div className="mt-20">
        {isFetched ? <OutfitPost post={post}></OutfitPost> : null}
      </div>
    </div>
  );
}
