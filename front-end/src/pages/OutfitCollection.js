import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import GenericHeader from "../components/GenericHeader";
import MainNav from '../components/MainNav';
import StyleNav from '../components/StyleNav';
import OutfitPreview from '../components/OutfitPost/OutfitPreview';
import { dummyUsers } from '../dummy/users';

export default function OutfitCollection() {
  // 6 previews per page
  // const dummyNew = dummyUsers.filter(user => user.id <= 6)
  const navigate = useNavigate();
  const [users, setUsers] = useState(dummyUsers);
  const [style, setStyle] = useState('All')
  const styles = ['All', 'Sporty & Athleisure', 'Streetwear', 'Classic', 'Funk', 'Minimal']

  const OutfitPreviews = users.map((user) => (
    //  style === user.posts[0].postStyle &&
    <OutfitPreview key={user.id} id={user.id} photo={user.posts[0].postMedia[0]} /> // show the first photo as preview
    
  ));

  console.log('style', style)
  return (
    <div>

      <GenericHeader pageName="Outfits" />
      <StyleNav onClick={() => setStyle(style)}></StyleNav>
      
      {/* outfit grid */}
    
        <div className='grid grid-cols-2 gap-1'>
         {OutfitPreviews}
        </div>


        <button onClick={() => navigate("/outfit-form")}
          className="fixed bottom-4 left-0 mb-10 w-full text-l font-bold bg-gray-500 text-white py-3">
          Post
        </button>
      
      <MainNav/>
    </div>
   
  )
}
