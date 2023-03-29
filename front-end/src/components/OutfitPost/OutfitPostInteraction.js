import { React, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart, FaRegCommentDots, FaRegBookmark, FaBookmark } from "react-icons/fa";

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
  }

  const [isLiked, setisLiked] = useLikeToggle()
  const [isSaved, setisSaved] = useSaveToggle()

  return (
    <div className='grid grid-cols-2 px-2'>

      <div className='flex space-x-2'>
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
      </div>

    </div>
  )
}
