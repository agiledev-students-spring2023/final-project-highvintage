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

export default function DiscussionInteraction(props) {
  const navigate = useNavigate();
  let likes = props.likes;

  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(likes);

  const useLikeToggle = (discussionID) => {
    const toggle = useCallback(async () => {
      try {
        const response = await axios.post(
          requestURL + `discussions/${props.discussionID}/like`,
          {
            userID: props.authorUsername,
            discussionID: props.discussionID,
            liked: !isLiked,
            discussionLikes: numLikes,
          }
        );
        console.log("likesbefore", numLikes);
        setIsLiked(!isLiked);
        setNumLikes(response.data.numLikes);
        console.log("likesafter", response.data.numLikes);
      } catch (error) {
        console.log(error);
      }
    }, [isLiked]);
    return [toggle];
  };

  const [toggleLike] = useLikeToggle(false, props.discussionID);

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
            onClick={() =>
              navigate(
                "/comments/" + props.discussionID + "?discussionPost=true"
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
