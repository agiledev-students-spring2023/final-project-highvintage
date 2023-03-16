import React from 'react'

export default function OutfitMedia(props) {
    return (
        <div className='my-2'> 
            <img className='object-cover aspect-square' src={props.media} />
         </div>
    )
}
