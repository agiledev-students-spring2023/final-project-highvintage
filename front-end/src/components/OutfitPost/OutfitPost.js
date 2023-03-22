import React from 'react'
import { useState } from "react";
import { dummyUsers } from '../../dummy/users'
import OutfitUserInfo from './OutfitUserInfo';
import OutfitMedia from './OutfitMedia';
import OutfitPostInteraction from './OutfitPostInteraction';
import OutfitText from './OutfitText';


export default function OutfitPost() {
  const [users, setUsers] = useState(dummyUsers);

  // const extractMedia = users[0].posts[0].postMedia
  // console.log('extractMedia', extractMedia)
  // const mediaComponent = extractMedia.map((m) => 
  //    <OutfitMedia media={m} />
  // );
  // console.log('mediaComponent',mediaComponent)

  return (
    // full outfit post - 4 children components combined
    <div className='grid grid-row-4 py-2 bg-white rounded-lg'>

      <OutfitUserInfo photo={users[0].photo} username={users[0].username} location={users[0].posts[0].postLoc} postDate={users[0].posts[0].postDate} />
      

      <div className='flex flex-row overflow-x-auto '>
        <OutfitMedia media={users[0].posts[0].postMedia} />
        {/* {mediaComponent} */}
      </div>

    
      <OutfitPostInteraction /> 
      <OutfitText text={users[0].posts[0].postText} />
      
    </div>
  )
}
