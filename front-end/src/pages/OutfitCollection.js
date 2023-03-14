import React from 'react'
import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import GenericHeader from "../components/GenericHeader";
import StyleNav from '../components/StyleNav';
import OutfitPreview from '../components/OutfitPreview';
import { dummyUsers } from '../dummy/users';

export default function OutfitCollection() {
  // 6 previews per page
  const dummyNew = dummyUsers.filter(user => user.id <= 6)

  const [users, setUsers] = useState(dummyNew);

  const OutfitPreviews = users.map((user) => (
    <OutfitPreview key={user.id} photo={user.posts[0].postMedia[0]} /> // show the first photo as preview
  ));

  return (
    <div>
      <GenericHeader pageName = "Outfits" />
      <StyleNav></StyleNav>
      
      {/* outfit grid */}
      <div className='grid grid-cols-2 grid-rows-3 gap-1'>
        {OutfitPreviews}
      </div>

    </div>
   
  )
}
