import React from 'react'
import { Link } from 'react-router-dom'
import {FaHome} from 'react-icons/fa'

export default function MainNav() {
  return (
      <div className='fixed bottom-0 grid grid-cols-5 items-center w-full px-2 py-4 text-center font-semibold rounded-t-md bg-white'>
          <div>
            Discuss
          </div>

          <Link to='/outfit-collection'>
              <div className='justify-self-center'>Outfits</div>
          </Link>

          <div className='mx-auto'>
              {/* link needs to be changed to /home later */}
              {/* <Link to='/'><FaHome size={30}></FaHome></Link>  */}
              <Link to='/'>Home</Link> 
          </div>

          <div>
            <Link to='/saved'>Saved</Link> 
          </div>

          <div>
            <Link to='/self'>Profile</Link>
          </div>
      </div>
  )
}
