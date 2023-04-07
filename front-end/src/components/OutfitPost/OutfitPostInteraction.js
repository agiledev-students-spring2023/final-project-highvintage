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

  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(likes);

  const useLikeToggle = (postID) => {
    const toggle = useCallback(async () => {
      try {
        const response = await axios.post(
          requestURL + `posts/${props.postID}/like`,
          {
            userID: props.username,
            postID: props.postID,
            liked: !isLiked,
            postLikes: numLikes,
          }
        );
        setIsLiked(!isLiked);
        setNumLikes(response.data.numLikes);
      } catch (error) {
        console.log(error);
      }
    }, [isLiked]);
    return [toggle];
  };

  const [toggleLike] = useLikeToggle(false, props.postID);

  return (
    <div className="grid grid-cols-1 px-2">
      <div className="flex space-x-2">
        {/* Like */}
        <div className="my-auto" onClick={toggleLike}>
          {!isLiked ? <FaRegHeart size={25} /> : <FaHeart size={25} />}
        </div>

        {/* Comment */}
        <div className="my-auto">
          <FaRegCommentDots
            size={24}
            onClick={() =>
              navigate("/comments/" + props.postID + "?photoPost=true")
            }
          ></FaRegCommentDots>
        </div>
      </div>

      {/* Num of Likes */}
      <div className="mt-2">
        <p className="font-semibold">{numLikes} Likes</p>
      </div>
    </div>
  );
}
