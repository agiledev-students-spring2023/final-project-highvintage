import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegHeart,
  FaHeart,
  FaRegCommentDots
} from "react-icons/fa";
import axios from "axios";
import { requestURL } from "../../requestURL";
import config from "../../token";

export default function OutfitPostInfo(props) {
  const navigate = useNavigate();
  let likes = props.likes;

  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(likes);

  console.log("props user", props);

  useEffect(() => {
    const fetchInitialLikeState = async () => {
      try {
        const response = await axios.get(
          requestURL + `posts/${props.postID}/like`,
          { config,  params: { userID: props.authorID } }
        );
        setIsLiked(response.data.isLiked);
        setNumLikes(response.data.numLikes);
      } catch (error) {
        console.log(error);
        navigate("/500");
      }
    };
    fetchInitialLikeState();
  }, [props.postID, props.authorID, navigate]); 


  const toggleLike = async () => {
    try {
      const response = await axios.post(
        requestURL + `posts/${props.postID}/like`,
        {
          userID: props.author,
          postID: props.postID,
          liked: !isLiked,
          postLikes: numLikes,
          config
        }
      );
      setIsLiked(response.data.isLiked);
      setNumLikes(response.data.numLikes);
    } catch (error) {
      navigate("/500");
    }
  };

  return (
    <div className="grid grid-cols-1 px-2">
      <div className="flex space-x-2">
        {/* Like */}
        <div className="my-auto" onClick={toggleLike}>
          {isLiked ? <FaHeart size={25} /> : <FaRegHeart size={25} />}
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
