
import { React, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart, FaRegCommentDots, FaRegBookmark, FaBookmark } from "react-icons/fa";
import axios from "axios";
import { requestURL } from "../../requestURL";

export default function OutfitPostInfo(props) {
  const navigate = useNavigate()
  let likes = props.likes;

  const useLikeToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => {
      setState(state => !state)
    }, []);
    console.log('liked state', state)
    if (state) { ++likes }
    else if (!state && state != 0) { --likes }
    console.log('likes', likes)
    return [state, toggle]
  }
  
  const useSaveToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => {
      setState(state => !state)
    }, []);
    console.log('saved state', state)
    return [state, toggle]


  async function handleSave() {
    console.log("savssse");
    console.log(requestURL);
    await axios.put(requestURL + "posts/save", { postID: props.postID });
  }

  const [isLiked, setisLiked] = useLikeToggle()
  const [isSaved, setisSaved] = useSaveToggle()

  return (
    <div className="grid grid-cols-2 px-2">
      <div className="flex space-x-2">
        {/* Like */}
        <div className='my-auto' onClick={setisLiked}>
          {!isLiked
            ?
            <FaRegHeart size={25} />
            :
            <FaHeart size={25} />
          }
        </div>

        {/* Comment */}
        <div className='my-auto'>
          <FaRegCommentDots size={24} onClick={()=>navigate('/comments')} />
        </div>
      </div>

      {/* Save */}
      <div className='justify-self-end my-auto' onClick={setisSaved}>
        {!isSaved
          ?
          <FaRegBookmark size={24} />
          : <FaBookmark size={24} />
        }
      

      <div className="justify-self-end my-auto" onClick={(e) => {handleSave(e); setisSaved();}}>
        {/* Save */}
        <FaRegBookmark size={24} />
      </div>
    </div>
  );
}
