import React from 'react'
import OutfitPost from '../components/OutfitPost'
import GenericHeader from '../components/GenericHeader'

export default function OutfitView() {
    return (
      // page to view full outfit post
      <div>
          <GenericHeader pageName="View Post"></GenericHeader>
          <div className='mt-20'>
              <OutfitPost></OutfitPost>
          </div>
      </div>
  )
}
