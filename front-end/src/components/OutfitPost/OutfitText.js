import React from 'react'

export default function OutfitText(props) {
  return (
    <div className='my-2 px-2'>
      <p className='font-semibold'>{props.likes}{" "}Likes</p>
      <p className='font-medium'>{props.text}</p>
    </div>
  )
}
