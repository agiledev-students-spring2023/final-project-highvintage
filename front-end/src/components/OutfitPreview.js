import React from 'react'
import { Link } from 'react-router-dom'

export default function OutfitPreview(props) {
  const handleOnClick = () => {
    console.log(props.id)
    const id = props.id
    return id
  }

  // individual preview within the grid - appears in OutfitCollection page
  return (
    <div className='w-full h-full'>

      <Link to='/outfit-view'>
        <img
          className="object-cover aspect-square justify-self-end"
          src={props.photo}
          // onClick={handleOnClick}
          />
      </Link>
          
      </div>
  )
}
