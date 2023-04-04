import { React, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegHeart,
  FaHeart,
  FaRegCommentDots,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import axios from "axios";
import { requestURL } from "../../requestURL";

export default function OutfitPostInfo(props) {
  const navigate = useNavigate();
  let likes = props.likes;

  async function handleSave() {
    console.log(requestURL);
    await axios.put(requestURL + "posts/save", { postID: props.postID });
  }

  const useLikeToggle = (initialState = false, postID) => {
    const [isLiked, setIsLiked] = useState(initialState);
    const [numLikes, setNumLikes] = useState(0);
    const toggle = useCallback(async () => {
      try {
        const response = await axios.post(
          requestURL + `posts/${props.postID}/like`,
          {
            postId: props.postID,
          }
        );
        setIsLiked(response.data.isLiked);
        setNumLikes(response.data.numLikes);
      } catch (error) {
        console.log(error);
      }
    }, [isLiked]);
    return [isLiked, toggle, numLikes];
  };

  const useSaveToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => {
      setState((state) => !state);
    }, []);
    console.log("saved state", state);
    return [state, toggle];
  };

  const [isLiked, toggleLike, numLikes] = useLikeToggle(false, props.postID);
  const [isSaved, setIsSaved] = useSaveToggle();

  return (
    <div className="grid grid-cols-2 px-2">
      <div className="flex space-x-2">
        {/* Like */}
        <div className="my-auto" onClick={toggleLike}>
          {!isLiked ? <FaRegHeart size={25} /> : <FaHeart size={25} />}
        </div>

        {/* Comment */}
        <div className="my-auto">
          <FaRegCommentDots
            size={24}
            onClick={() => navigate("/comments")}
          ></FaRegCommentDots>
        </div>
      </div>

      {/* Save */}
      <div
        className="justify-self-end my-auto"
        onClick={async (e) => {
          setIsSaved();
          await handleSave();
        }}
      >
        {!isSaved ? <FaRegBookmark size={24} /> : <FaBookmark size={24} />}
      </div>

      <div className="mt-2">
        <p className="font-semibold">{numLikes} Likes</p>
      </div>
    </div>
  );
}
