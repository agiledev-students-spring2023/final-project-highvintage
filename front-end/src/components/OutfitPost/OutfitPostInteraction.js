import React from 'react'
import {FaRegHeart, FaHeart, FaRegCommentDots, FaRegBookmark, FaBookmark} from "react-icons/fa";

export default function OutfitPostInfo() {
  const handleLike = () => {
    console.log('handle like')
  }
  const handleComment = () => {
    console.log('handle comment')
  }
  const handleSave = () => {
    console.log('handle save')
  }

  return (
    <div className='grid grid-cols-2 px-2'>

      <div className='flex space-x-2'>
        {/* Like */}
        <div className='my-auto' onClick={handleLike}>
          <FaRegHeart size={25} />
        </div>

        {/* Comment */}
        <div className='my-auto' onClick={handleComment}>
          <FaRegCommentDots size={24} />
        </div>
      </div>

      <div className='justify-self-end my-auto' onClick={handleSave}>
        {/* Save */}
        <FaRegBookmark size={24} />
      </div>

    </div>
  )
}
