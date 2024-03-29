import { React, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart, FaRegCommentDots } from "react-icons/fa";
import axios from "axios";
import { requestURL } from "../../requestURL";
import config, { headers } from "../../token";

export default function DiscussionInteraction(props) {
  const navigate = useNavigate();
  let likes = props.likes;

  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(likes);
  //fetch initial state to set heart status
  useEffect(() => {
    fetchInitialLikeState().catch(()=> navigate("/500"));
  }, );

  const fetchInitialLikeState = async () => {
    try {
      const response = await axios.get(
        requestURL + `discussions/${props.discussionID}/like`,config ,
        { params: { userID: props.authorID } }, 
      );
      setIsLiked(response.data.isLiked);
      setNumLikes(response.data.numLikes);
    } catch (error) {
      navigate("/500");
    }
  };
  //handling liking
  const useLikeToggle = () => {
    const toggle = useCallback(async () => {
      try {
        const response = await axios.post(
          requestURL + `discussions/${props.discussionID}/like`, 
          {
            userID: props.authorID,
            discussionID: props.discussionID,
            liked: !isLiked,
            discussionLikes: numLikes,
          },config
        );
        setNumLikes(response.data.numLikes);
        setIsLiked(response.data.isLiked);
      } catch (error) {
        navigate("/500");
      }
    }, [isLiked]);// eslint-disable-line react-hooks/exhaustive-deps
    return [toggle];
  };

  const [toggleLike] = useLikeToggle(false, props.discussionID);

  const handleCommentClick = () => {
    try {
      navigate("/comments/" + props.discussionID + "?discussionPost=true", config);
    } catch (error) {
      navigate("/500");
    }
  };

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
            onClick={handleCommentClick}
          />
        </div>
      </div>
    </div>
  );
}
