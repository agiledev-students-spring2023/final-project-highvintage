import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import OutfitPost from "../components/OutfitPost/OutfitPost";
import GenericHeader from "../components/GenericHeader";
import MainNav from "../components/MainNav";
import { requestURL } from "../requestURL";
import axios from "axios";

export default function OutfitView() {
  // fetch on page load - useEffect
  const params = useParams();
  const navigate = useNavigate();
  const [me, setMe] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  // this matches the response with all of the same properties!
  const [post, setPost] = useState({});
  useEffect(() => {
    async function fetchPost(query) {
      try {
        const response = await axios.get(
          requestURL + "posts/view/?id=" + query
        );
        response.data.post.postText = response.data.post.caption;
        setPost(response.data.post);
        setIsFetched(true);
        return response.data;
      } catch (error) {
        console.log("Cannot fetch", error);
      }
    }
    // still needs err handling
    console.log("params.id", params.id);
    fetchPost(params.id);
    return () => {};
  }, [params.id]);

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await axios.get(requestURL + "users/me");
        setMe(response.data.user.username);
      }
      catch {
        navigate("/500");
      }
    }
    fetchMe();
  });

  return (
    <div>
      <GenericHeader pageName="View Post"></GenericHeader>
      <div className="mt-20">
        {isFetched ? <OutfitPost post={post}></OutfitPost> : null}
      </div>
      <MainNav linkToMe={me} />
    </div>
  );
}
