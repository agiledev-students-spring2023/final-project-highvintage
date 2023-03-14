import React from 'react'

export default function OutfitPreview(props) {
  const handleOnClick = () => {
    console.log('..will lead to full post')
  }
  return (
      <div className='w-full h-full'>
          <img
            className="object-cover aspect-square justify-self-end"
            src={props.photo}
            onClick={handleOnClick}
          />
      </div>
  )
}
